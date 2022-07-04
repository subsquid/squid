import assert from "assert";
import * as marshal from "./marshal";

export class ContenthashChanged {
  public readonly isTypeOf = "ContenthashChanged";
  private _hash!: Uint8Array;

  constructor(props?: Partial<Omit<ContenthashChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._hash = marshal.bytes.fromJSON(json.hash);
    }
  }

  get hash(): Uint8Array {
    assert(this._hash != null, "uninitialized access");
    return this._hash;
  }

  set hash(value: Uint8Array) {
    this._hash = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      hash: marshal.bytes.toJSON(this.hash),
    };
  }
}
