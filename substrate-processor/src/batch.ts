import {assertNotNull} from "@subsquid/util"
import {BlockHandler, EventHandler, ExtrinsicHandler} from "./interfaces/handlerContext"
import {Hooks} from "./interfaces/hooks"
import {QualifiedName} from "./interfaces/substrate"
import {Heap} from "./util/heap"
import {Range, rangeDifference, rangeIntersection} from "./util/range"
import {AnyTopics, ContractAddress, EvmLogHandler, Topics, TopicsSeparator} from "./interfaces/evm";


export interface DataHandlers {
    pre: BlockHandler[]
    post: BlockHandler[]
    events: Record<QualifiedName, EventHandler[]>
    /**
     * Mapping of type `trigger event` -> `extrinsic` -> `extrinsic handler list`
     */
    extrinsics: Record<QualifiedName, Record<QualifiedName, ExtrinsicHandler[]>>
    /**
     * Mapping of type `trigger evm event` -> `topic` -> `EVM handler list`
     */
    evmLogs: Record<ContractAddress, Record<Topics, EvmLogHandler[]>>
}


export interface Batch {
    range: Range
    handlers: DataHandlers
}


export function createBatches(hooks: Hooks, blockRange?: Range): Batch[] {
    let batches: Batch[] = []

    function getRange(hook: { range?: Range }): Range | undefined {
        let range: Range | undefined = hook.range || {from: 0}
        if (blockRange) {
            range = rangeIntersection(range, blockRange)
        }
        return range
    }

    hooks.pre.forEach(hook => {
        let range = getRange(hook)
        if (!range) return
        batches.push({
            range,
            handlers: {
                pre: [hook.handler],
                post: [],
                events: {},
                extrinsics: {},
                evmLogs: {}
            }
        })
    })

    hooks.post.forEach(hook => {
        let range = getRange(hook)
        if (!range) return
        batches.push({
            range,
            handlers: {
                pre: [],
                post: [hook.handler],
                events: {},
                extrinsics: {},
                evmLogs: {}
            }
        })
    })

    hooks.event.forEach(hook => {
        let range = getRange(hook)
        if (!range) return
        batches.push({
            range,
            handlers: {
                pre: [],
                post: [],
                events: {
                    [hook.event]: [hook.handler]
                },
                extrinsics: {},
                evmLogs: {}
            }
        })
    })

    hooks.extrinsic.forEach(hook => {
        let range = getRange(hook)
        if (!range) return
        batches.push({
            range,
            handlers: {
                pre: [],
                post: [],
                events: {},
                extrinsics: {
                    [hook.event]: {[hook.extrinsic]: [hook.handler]}
                },
                evmLogs: {}
            }
        })
    })

    hooks.evmLog.forEach(hook => {
        let range = getRange(hook)
        if (!range) return
        batches.push({
            range,
            handlers: {
                pre: [],
                post: [],
                events: {},
                extrinsics: {},
                evmLogs: {
                    [hook.contractAddress]: {[hook.topics?.join(TopicsSeparator) || AnyTopics]: [hook.handler]}
                }
            }
        })
    })

    batches = mergeBatches(batches)

    return batches
}


export function mergeBatches(batches: Batch[]): Batch[] {
    if (batches.length <= 1) return batches

    let union: Batch[] = []
    let heap = new Heap<Batch>((a, b) => a.range.from - b.range.from)

    heap.init(batches.slice())

    let top = assertNotNull(heap.pop())
    let batch: Batch | undefined
    while (batch = heap.peek()) {
        let i = rangeIntersection(top.range, batch.range)
        if (i == null) {
            union.push(top)
            top = assertNotNull(heap.pop())
        } else {
            heap.pop()
            rangeDifference(top.range, i).forEach(range => {
                heap.push({range, handlers: top.handlers})
            })
            rangeDifference(batch.range, i).forEach(range => {
                heap.push({range, handlers: batch!.handlers})
            })
            heap.push({
                range: i,
                handlers: mergeDataHandlers(top.handlers, batch.handlers)
            })
            top = assertNotNull(heap.pop())
        }
    }
    union.push(top)
    return union
}


function mergeDataHandlers(a: DataHandlers, b: DataHandlers): DataHandlers {
    return {
        pre: a.pre.concat(b.pre),
        post: a.post.concat(b.post),
        events: mergeMaps(a.events, b.events, (ha, hb) => ha.concat(hb)),
        extrinsics: mergeMaps(a.extrinsics, b.extrinsics, (ea, eb) => {
            return mergeMaps(ea, eb, (ha, hb) => ha.concat(hb))
        }),
        evmLogs: mergeMaps(a.evmLogs, b.evmLogs, (ea, eb) => {
            return mergeMaps(ea, eb, (ha, hb) => ha.concat(hb))
        }),
    }
}


function mergeMaps<T>(a: Record<string, T>, b: Record<string, T>, mergeItems: (a: T, b: T) => T): Record<string, T> {
    let result: Record<string, T> = {}
    for (let key in a) {
        if (b[key] == null) {
            result[key] = a[key]
        } else {
            result[key] = mergeItems(a[key], b[key])
        }
    }
    for (let key in b) {
        if (result[key] == null) {
            result[key] = b[key]
        }
    }
    return result
}


export function getBlocksCount(batches: { range: Range }[], chainHeight: number): number {
    let count = 0
    for (let i = 0; i < batches.length; i++) {
        let range = batches[i].range
        if (chainHeight < range.from) return count
        let to = Math.min(chainHeight, range.to ?? Infinity)
        count += to - range.from + 1
    }
    return count
}
