import assert from "assert";
import * as marshal from "./marshal";

export class AbiChanged {
  public readonly isTypeOf = "AbiChanged";
  private _contentType!: bigint;

  constructor(props?: Partial<Omit<AbiChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._contentType = marshal.bigint.fromJSON(json.contentType);
    }
  }

  get contentType(): bigint {
    assert(this._contentType != null, "uninitialized access");
    return this._contentType;
  }

  set contentType(value: bigint) {
    this._contentType = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      contentType: marshal.bigint.toJSON(this.contentType),
    };
  }
}
