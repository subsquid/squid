import assert from "assert";
import * as marshal from "./marshal";

export class NewTTL {
  public readonly isTypeOf = "NewTTL";
  private _ttl!: bigint;

  constructor(props?: Partial<Omit<NewTTL, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._ttl = marshal.bigint.fromJSON(json.ttl);
    }
  }

  get ttl(): bigint {
    assert(this._ttl != null, "uninitialized access");
    return this._ttl;
  }

  set ttl(value: bigint) {
    this._ttl = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      ttl: marshal.bigint.toJSON(this.ttl),
    };
  }
}
