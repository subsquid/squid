import assert from "assert";
import * as marshal from "./marshal";

export class NameRenewed {
  public readonly isTypeOf = "NameRenewed";
  private _expiryDate!: bigint;

  constructor(props?: Partial<Omit<NameRenewed, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._expiryDate = marshal.bigint.fromJSON(json.expiryDate);
    }
  }

  get expiryDate(): bigint {
    assert(this._expiryDate != null, "uninitialized access");
    return this._expiryDate;
  }

  set expiryDate(value: bigint) {
    this._expiryDate = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      expiryDate: marshal.bigint.toJSON(this.expiryDate),
    };
  }
}
