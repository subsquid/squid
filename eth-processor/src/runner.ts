import { EthProcessor } from "./processor"
import axios from "axios"
import { Log } from "./eth"

export class Runner<Store> {
    private processor: EthProcessor<Store>

    constructor(processor: EthProcessor<Store>) {
        this.processor = processor
    }

    async run(): Promise<void> {
        const db = this.processor.getDatabase();
		const archiveEndpoint = this.processor.getArchiveEndpoint();

		const heightAtStart = await db.connect()

        console.log(`heightAtStart: ${heightAtStart}`);

        const blockRange = this.processor.getBlockRange()
		const from: number = heightAtStart > blockRange.from ? heightAtStart : blockRange.from
		let to: number;
		if (blockRange.to) {
			to = blockRange.to;
		} else {
			const status = await axios.get(`${archiveEndpoint}/status`);
			to = status.data.number
		}
		
        const batchSize = this.processor.getBatchSize()

        const hooks = this.processor.getHooks().evmLog

        const fieldSelection = this.processor.getFieldSelection()

        console.log(`FROM: ${from} TO: ${to}`);

		for (let start=from; start<to; start += batchSize) {
			const end = (start + batchSize > to ? to : start + batchSize) - 1;

            console.log(`getting ${start} to ${end}`);

            const req = {
                fromBlock: start,
                toBlock: end + 1,
                addresses: hooks.map(hook => ({
                    address: hook.options.address,
                    topics: hook.options.topics,
                })),
                fieldSelection,
            };

            const startTime = process.hrtime.bigint();

            const { data: logs } = await axios.post(`${archiveEndpoint}/query`, req, {
                decompress: true,
                headers: {
                    "Accept-Encoding": "gzip"
                }
            });

            console.log(`got ${start} to ${end}`);

            await db.transact(start, end, async store => {
                for(const rawLog of logs) {
                    const log = logFromRaw(rawLog);
    
                    for (const hook of hooks) {
                        if (hook.options.address === log.address && matchTopics(hook.options.topics, log.topics)) {
                            await hook.handler({
                                log,
                                store,
                            })
                        }
                    }
                }
            });

            const endTime = process.hrtime.bigint();

            console.log(`elapsed: ${(end-start) * 1_000_000_000 / Number(endTime - startTime)}`)

            console.log(`advancing to ${end}`);
		}
    }
}

function logFromRaw(raw: any): Log {
    let tx: any = {};
    let block: any = {};
    let log: any = {
        topics: [],
    };

    for(let i=0; i<4; ++i) {
        const val = raw[`log_topic${i}`];
        if (val) {
            log.topics.push(val);
        }
    }

    for(const key of Object.keys(raw)) {
        if(key.startsWith("log")) {
            let name = key.substring(4)

            if (!name.startsWith("topic")) {
                log[name] = raw[key];
            }
        } else if(key.startsWith("tx")) {
            tx[key.substring(3)] = raw[key];
        }  else if(key.startsWith("block")) {
            block[key.substring(6)] = raw[key];
        }
    }

	return {
		tx, block, ...log
	}
}

function matchTopics(expected: Array<Array<string> | null>, got: Array<string | null>): boolean {
    for(let i=0; i<4; ++i) {
        const gotTopic = got[i];
        const expectedTopics = expected[i];

        if (!expectedTopics) {
            continue;
        }

        const found = expectedTopics.find(topic => {
            return topic === gotTopic;
        });

        if(!found) {
            return false;
        }
    }

    return true;
}