export interface BlockFieldSelection {
	number?: boolean;
	hash?: boolean;
	parentHash?: boolean;
	nonce?: boolean;
	sha3Uncles?: boolean;
	logsBloom?: boolean;
	transactionsRoot?: boolean;
	stateRoot?: boolean;
	receiptsRoot?: boolean;
	miner?: boolean;
	difficulty?: boolean;
	totalDifficulty?: boolean;
	extraData?: boolean;
	size?: boolean;
	gasLimit?: boolean;
	gasUsed?: boolean;
	timestamp?: boolean;
}

export interface TransactionFieldSelection {
	blockHash?: boolean;
	blockNumber?: boolean;
	from?: boolean;
	gas?: boolean;
	gasPrice?: boolean;
	hash?: boolean;
	input?: boolean;
	nonce?: boolean;
	to?: boolean;
	transactionIndex?: boolean;
	value?: boolean;
	v?: boolean;
	r?: boolean;
	s?: boolean;
}

export interface LogFieldSelection {
    block: BlockFieldSelection;
    tx: TransactionFieldSelection;
	address?: boolean;
	blockHash?: boolean;
	blockNumber?: boolean;
	data?: boolean;
	logIndex?: boolean;
	removed?: boolean;
	topic0?: boolean;
	topic1?: boolean;
	topic2?: boolean;
	topic3?: boolean;
	transactionHash?: boolean;
	transactionIndex?: boolean;
}