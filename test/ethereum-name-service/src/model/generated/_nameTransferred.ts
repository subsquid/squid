import assert from "assert";
import * as marshal from "./marshal";
import { Account } from "./account.model";

export class NameTransferred {
  public readonly isTypeOf = "NameTransferred";
  private _newOwner!: string;

  constructor(props?: Partial<Omit<NameTransferred, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._newOwner = marshal.string.fromJSON(json.newOwner);
    }
  }

  get newOwner(): string {
    assert(this._newOwner != null, "uninitialized access");
    return this._newOwner;
  }

  set newOwner(value: string) {
    this._newOwner = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      newOwner: this.newOwner,
    };
  }
}
