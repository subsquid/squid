import assert from "assert";
import * as marshal from "./marshal";
import { Account } from "./account.model";

export class NameRegistered {
  public readonly isTypeOf = "NameRegistered";
  private _registrant!: string;
  private _expiryDate!: bigint;

  constructor(props?: Partial<Omit<NameRegistered, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._registrant = marshal.string.fromJSON(json.registrant);
      this._expiryDate = marshal.bigint.fromJSON(json.expiryDate);
    }
  }

  get registrant(): string {
    assert(this._registrant != null, "uninitialized access");
    return this._registrant;
  }

  set registrant(value: string) {
    this._registrant = value;
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
      registrant: this.registrant,
      expiryDate: marshal.bigint.toJSON(this.expiryDate),
    };
  }
}
