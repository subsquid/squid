import { Log } from "@subsquid/eth-processor";

export function createEventID(blockNumber: number, logIndex: string): string {
  return blockNumber.toString().concat("-").concat(BigInt(logIndex).toString());
}
