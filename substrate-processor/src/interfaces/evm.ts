import {Chain} from "../chain"
import {Range} from "../util/range"
import {Store} from "./handlerContext"
import {SubstrateBlock, SubstrateEvent, SubstrateExtrinsic} from "./substrate"


export type EvmContractAddress = string
export type EvmTopic = string


export interface EvmLogEvent extends SubstrateEvent {
    name: 'evm.Log'
    evmLogAddress: EvmContractAddress
    evmLogTopics: EvmTopic[]
    evmLogData: string
    evmHash: string
}


export interface EvmLogHandlerContext {
    topics: EvmTopic[]
    data: string
    txHash: string
    contractAddress: EvmContractAddress
    substrate: {
        _chain: Chain,
        event: SubstrateEvent,
        block: SubstrateBlock,
        extrinsic?: SubstrateExtrinsic
    }
    store: Store
}


export interface EvmLogHandler {
    (ctx: EvmLogHandlerContext): Promise<void>
}


export type EvmTopicSet = EvmTopic | null | undefined | EvmTopic[]


export interface EvmLogHandlerOptions {
    range?: Range
    /**
     * EVM topic filter as defined by https://docs.ethers.io/v5/concepts/events/#events--filters
     */
    filter?: EvmTopicSet[]
}
