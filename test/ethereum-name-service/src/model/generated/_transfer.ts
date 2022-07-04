import assert from "assert";
import * as marshal from "./marshal";
import { Account } from "./account.model";

export class Transfer {
  public readonly isTypeOf = "Transfer";
  private _owner!: string;

  constructor(props?: Partial<Omit<Transfer, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._owner = marshal.string.fromJSON(json.owner);
    }
  }

  get owner(): string {
    assert(this._owner != null, "uninitialized access");
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      owner: this.owner,
    };
  }
}
