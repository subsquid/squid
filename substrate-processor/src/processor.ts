import {ResilientRpcClient} from "@subsquid/rpc-client/lib/resilient"
import {getOldTypesBundle, OldTypesBundle, readOldTypesBundle} from "@subsquid/substrate-metadata"
import {assertNotNull, toCamelCase} from "@subsquid/util"
import assert from "assert"
import {createBatches, DataHandlers, getBlocksCount} from "./batch"
import {ChainManager} from "./chain"
import {Db, IsolationLevel} from "./db"
import {DataBatch, Ingest} from "./ingest"
import {EvmLogEvent, EvmLogHandler} from "./interfaces/evm"
import {BlockHandler, BlockHandlerContext, EventHandler, ExtrinsicHandler} from "./interfaces/handlerContext"
import {Hooks} from "./interfaces/hooks"
import {QualifiedName, SubstrateEvent} from "./interfaces/substrate"
import {ProgressTracker} from "./progress-tracker"
import {Prometheus} from "./prometheus"
import {timeInterval} from "./util/misc"
import {Range} from "./util/range"
import {ServiceManager} from "./util/sm"


export interface BlockHookOptions {
    range?: Range
}


export interface EventHandlerOptions {
    range?: Range
}


export interface ExtrinsicHandlerOptions {
    range?: Range
    triggerEvents?: QualifiedName[]
}


export interface DataSource {
    /**
     * Archive endpoint URL
     */
    archive: string
    /**
     * Chain node RPC websocket URL
     */
    chain: string
}


export class SubstrateProcessor {
    protected hooks: Hooks = {pre: [], post: [], event: [], extrinsic: [], evmLog: []}
    private blockRange: Range = {from: 0}
    private batchSize = 100
    private prometheusPort?: number | string
    private src?: DataSource
    private typesBundle?: OldTypesBundle
    private isolationLevel?: IsolationLevel
    private running = false

    constructor(private name: string) {}

    setDataSource(src: DataSource): void {
        this.assertNotRunning()
        this.src = src
    }

    setTypesBundle(bundle: string | OldTypesBundle): void {
        this.assertNotRunning()
        if (typeof bundle == 'string') {
            this.typesBundle = getOldTypesBundle(bundle) || readOldTypesBundle(bundle)
        } else {
            this.typesBundle = bundle
        }
    }

    setBlockRange(range: Range): void {
        this.assertNotRunning()
        this.blockRange = range
    }

    setBatchSize(size: number): void {
        this.assertNotRunning()
        assert(size > 0)
        this.batchSize = size
    }

    setPrometheusPort(port: number | string) {
        this.assertNotRunning()
        this.prometheusPort = port
    }

    setIsolationLevel(isolationLevel?: IsolationLevel): void {
        this.assertNotRunning()
        this.isolationLevel = isolationLevel
    }

    private getPrometheusPort(): number | string {
        return this.prometheusPort == null ? process.env.PROCESSOR_PROMETHEUS_PORT || 0 : this.prometheusPort
    }

    addPreHook(fn: BlockHandler): void
    addPreHook(options: BlockHookOptions, fn: BlockHandler): void
    addPreHook(fnOrOptions: BlockHandler | BlockHookOptions, fn?: BlockHandler): void {
        this.assertNotRunning()
        let handler: BlockHandler
        let options: BlockHookOptions = {}
        if (typeof fnOrOptions == 'function') {
            handler = fnOrOptions
        } else {
            handler = assertNotNull(fn)
            options = fnOrOptions
        }
        this.hooks.pre.push({handler, ...options})
    }

    addPostHook(fn: BlockHandler): void
    addPostHook(options: BlockHookOptions, fn: BlockHandler): void
    addPostHook(fnOrOptions: BlockHandler | BlockHookOptions, fn?: BlockHandler): void {
        this.assertNotRunning()
        let handler: BlockHandler
        let options: BlockHookOptions = {}
        if (typeof fnOrOptions == 'function') {
            handler = fnOrOptions
        } else {
            handler = assertNotNull(fn)
            options = fnOrOptions
        }
        this.hooks.post.push({handler, ...options})
    }

    addEventHandler(eventName: QualifiedName, fn: EventHandler): void
    addEventHandler(eventName: QualifiedName, options: EventHandlerOptions, fn: EventHandler): void
    addEventHandler(eventName: QualifiedName, fnOrOptions: EventHandlerOptions | EventHandler, fn?: EventHandler): void {
        this.assertNotRunning()
        let handler: EventHandler
        let options: EventHandlerOptions = {}
        if (typeof fnOrOptions === 'function') {
            handler = fnOrOptions
        } else {
            handler = assertNotNull(fn)
            options = fnOrOptions
        }
        this.hooks.event.push({
            event: eventName,
            handler,
            ...options
        })
    }

    addExtrinsicHandler(extrinsicName: QualifiedName, fn: ExtrinsicHandler): void
    addExtrinsicHandler(extrinsicName: QualifiedName, options: ExtrinsicHandlerOptions, fn: ExtrinsicHandler): void
    addExtrinsicHandler(extrinsicName: QualifiedName, fnOrOptions: ExtrinsicHandler | ExtrinsicHandlerOptions, fn?: ExtrinsicHandler): void {
        this.assertNotRunning()
        let handler: ExtrinsicHandler
        let options: ExtrinsicHandlerOptions = {}
        if (typeof fnOrOptions == 'function') {
            handler = fnOrOptions
        } else {
            handler = assertNotNull(fn)
            options = {...fnOrOptions}
        }
        let triggers = options.triggerEvents || ['system.ExtrinsicSuccess']
        new Set(triggers).forEach(event => {
            this.hooks.extrinsic.push({
                event,
                handler,
                extrinsic: extrinsicName.split('.').map(n => toCamelCase(n)).join('.'),
                range: options.range
            })
        })
    }

    protected assertNotRunning(): void {
        if (this.running) {
            throw new Error('Settings modifications are not allowed after start of processing')
        }
    }

    run(): void {
        if (this.running) return
        this.running = true
        ServiceManager.run(sm => this._run(sm))
    }

    private async _run(sm: ServiceManager): Promise<void> {
        let prometheus = new Prometheus()
        let prometheusServer = sm.add(await prometheus.serve(this.getPrometheusPort()))
        console.log(`Prometheus metrics are served at port ${prometheusServer.port}`)

        let db = sm.add(await Db.connect({
            processorName: this.name,
            isolationLevel: this.isolationLevel
        }))

        let {height: heightAtStart} = await db.init()

        prometheus.setLastProcessedBlock(heightAtStart)

        let blockRange = this.blockRange
        if (blockRange.to != null && blockRange.to < heightAtStart + 1) {
            return
        } else {
            blockRange = {
                from: Math.max(heightAtStart + 1, blockRange.from),
                to: blockRange.to
            }
        }

        let batches = createBatches(this.hooks, blockRange)

        let ingest = sm.add(new Ingest({
            archive: assertNotNull(this.src?.archive, 'use .setDataSource() to specify archive url'),
            batches$: batches,
            batchSize: this.batchSize,
            metrics: prometheus
        }))

        let client = sm.add(new ResilientRpcClient(
            assertNotNull(this.src?.chain, 'use .setDataSource() to specify chain RPC endpoint')
        ))

        let wholeRange = createBatches(this.hooks, this.blockRange)
        let progress = new ProgressTracker(
            getBlocksCount(wholeRange, heightAtStart),
            wholeRange,
            prometheus
        )

        await this.process(
            ingest,
            new ChainManager(client, this.typesBundle),
            db,
            prometheus,
            progress
        )
    }

    private async process(
        ingest: Ingest,
        chainManager: ChainManager,
        db: Db,
        prom: Prometheus,
        progress: ProgressTracker
    ): Promise<void> {
        let batch: DataBatch | null
        let lastBlock = -1
        while (batch = await ingest.nextBatch()) {
            let {handlers, blocks, range} = batch
            let beg = blocks.length > 0 ? process.hrtime.bigint() : 0n

            for (let block of blocks) {
                assert(lastBlock < block.block.height)
                let chain = await chainManager.getChainForBlock(block.block)
                await db.transact(block.block.height, async store => {
                    let ctx: BlockHandlerContext = {
                        _chain: chain,
                        store,
                        ...block
                    }

                    for (let pre of handlers.pre) {
                        await pre(ctx)
                    }

                    for (let event of block.events) {
                        let extrinsic = event.extrinsic

                        for (let eventHandler of handlers.events[event.name] || []) {
                            await eventHandler({...ctx, event, extrinsic})
                        }

                        for (let evmLogHandler of this.getEvmLogHandlers(handlers.evmLogs, event)) {
                            let log = event as EvmLogEvent
                            await evmLogHandler({
                                contractAddress: log.evmLogAddress,
                                topics: log.evmLogTopics,
                                data: log.evmLogData,
                                txHash: log.evmHash,
                                substrate: {...ctx, event, extrinsic},
                                store
                            })
                        }

                        if (extrinsic == null) continue
                        for (let callHandler of handlers.extrinsics[event.name]?.[extrinsic.name] || []) {
                            await callHandler({...ctx, event, extrinsic})
                        }
                    }

                    for (let post of handlers.post) {
                        await post(ctx)
                    }
                })

                lastBlock = block.block.height
                prom.setLastProcessedBlock(lastBlock)
            }

            if (lastBlock < range.to) {
                lastBlock = range.to
                await db.setHeight(lastBlock)
                prom.setLastProcessedBlock(lastBlock)
            }

            let end = process.hrtime.bigint()
            progress.batch(end, batch)

            let status: string[] = []
            status.push(`Last block: ${lastBlock}`)
            if (blocks.length > 0) {
                let speed = blocks.length * Math.pow(10, 9) / Number(end - beg)
                let roundedSpeed = Math.round(speed)
                status.push(`mapping: ${roundedSpeed} blocks/sec`)
                prom.setMappingSpeed(speed)
            }
            status.push(`ingest: ${Math.round(prom.getIngestSpeed())} blocks/sec`)
            status.push(`eta: ${timeInterval(progress.getSyncEtaSeconds())}`)
            status.push(`progress: ${Math.round(progress.getSyncRatio() * 100)}%`)
            console.log(status.join(', '))
        }
    }

    private *getEvmLogHandlers(evmLogs: DataHandlers["evmLogs"], event: SubstrateEvent): Generator<EvmLogHandler> {
        if (event.name != 'evm.Log') return
        let log = event as EvmLogEvent

        let contractHandlers = evmLogs[log.evmLogAddress]
        if (contractHandlers == null) return

        let called = new Set<EvmLogHandler>()
        let handlers: EvmLogHandler[] | undefined = contractHandlers['*']

        if (handlers) {
            for (let h of handlers) {
                called.add(h)
                yield h
            }
        }

        for (let topic of log.evmLogTopics) {
            handlers = contractHandlers[topic]
            if (handlers == null) continue
            for (let h of handlers) {
                if (called.has(h)) continue
                called.add(h)
                yield h
            }
        }
    }
}
