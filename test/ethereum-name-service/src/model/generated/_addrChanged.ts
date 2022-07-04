import assert from "assert";
import * as marshal from "./marshal";
import { Account } from "./account.model";

export class AddrChanged {
  public readonly isTypeOf = "AddrChanged";
  private _addr!: string;

  constructor(props?: Partial<Omit<AddrChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._addr = marshal.string.fromJSON(json.addr);
    }
  }

  get addr(): string {
    assert(this._addr != null, "uninitialized access");
    return this._addr;
  }

  set addr(value: string) {
    this._addr = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      addr: this.addr,
    };
  }
}
