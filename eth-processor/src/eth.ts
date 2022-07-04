export interface Block {
	number?: number;
	hash?: string;
	parentHash?: string;
	nonce?: string;
	sha3Uncles?: string;
	logsBloom?: string;
	transactionsRoot?: string;
	stateRoot?: string;
	receiptsRoot?: string;
	miner?: string;
	difficulty?: string;
	totalDifficulty?: string;
	extraData?: string;
	size?: string;
	gasLimit?: string;
	gasUsed?: string;
	timestamp?: string;
}

export interface Transaction {
	blockHash?: string;
	blockNumber?: number;
	from?: string;
	gas?: string;
	gasPrice?: string;
	hash?: string;
	input?: string;
	nonce?: string;
	to?: string;
	transactionIndex?: string;
	value?: string;
	v?: string;
	r?: string;
	s?: string;
}

export interface Log {
	address?: string;
	blockHash?: string;
	blockNumber?: number;
	data?: string;
	logIndex?: string;
	removed?: boolean;
	topics: Array<string>;
	transactionHash?: string;
	transactionIndex?: string;
	tx: Transaction;
	block: Block;
}
