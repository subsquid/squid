import assert from "assert";
import * as marshal from "./marshal";

export class AuthorisationChanged {
  public readonly isTypeOf = "AuthorisationChanged";
  private _owner!: Uint8Array;
  private _target!: Uint8Array;
  private _isAuthorized!: boolean;

  constructor(
    props?: Partial<Omit<AuthorisationChanged, "toJSON">>,
    json?: any
  ) {
    Object.assign(this, props);
    if (json != null) {
      this._owner = marshal.bytes.fromJSON(json.owner);
      this._target = marshal.bytes.fromJSON(json.target);
      this._isAuthorized = marshal.boolean.fromJSON(json.isAuthorized);
    }
  }

  get owner(): Uint8Array {
    assert(this._owner != null, "uninitialized access");
    return this._owner;
  }

  set owner(value: Uint8Array) {
    this._owner = value;
  }

  get target(): Uint8Array {
    assert(this._target != null, "uninitialized access");
    return this._target;
  }

  set target(value: Uint8Array) {
    this._target = value;
  }

  get isAuthorized(): boolean {
    assert(this._isAuthorized != null, "uninitialized access");
    return this._isAuthorized;
  }

  set isAuthorized(value: boolean) {
    this._isAuthorized = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      owner: marshal.bytes.toJSON(this.owner),
      target: marshal.bytes.toJSON(this.target),
      isAuthorized: this.isAuthorized,
    };
  }
}
