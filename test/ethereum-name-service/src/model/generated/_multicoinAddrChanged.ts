import assert from "assert";
import * as marshal from "./marshal";

export class MulticoinAddrChanged {
  public readonly isTypeOf = "MulticoinAddrChanged";
  private _coinType!: bigint;
  private _mcAddr!: Uint8Array;

  constructor(
    props?: Partial<Omit<MulticoinAddrChanged, "toJSON">>,
    json?: any
  ) {
    Object.assign(this, props);
    if (json != null) {
      this._coinType = marshal.bigint.fromJSON(json.coinType);
      this._mcAddr = marshal.bytes.fromJSON(json.mcAddr);
    }
  }

  get coinType(): bigint {
    assert(this._coinType != null, "uninitialized access");
    return this._coinType;
  }

  set coinType(value: bigint) {
    this._coinType = value;
  }

  get mcAddr(): Uint8Array {
    assert(this._mcAddr != null, "uninitialized access");
    return this._mcAddr;
  }

  set mcAddr(value: Uint8Array) {
    this._mcAddr = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      coinType: marshal.bigint.toJSON(this.coinType),
      mcAddr: marshal.bytes.toJSON(this.mcAddr),
    };
  }
}
