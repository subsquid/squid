import assert from "assert";
import * as marshal from "./marshal";

export class PubkeyChanged {
  public readonly isTypeOf = "PubkeyChanged";
  private _x!: Uint8Array;
  private _y!: Uint8Array;

  constructor(props?: Partial<Omit<PubkeyChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._x = marshal.bytes.fromJSON(json.x);
      this._y = marshal.bytes.fromJSON(json.y);
    }
  }

  get x(): Uint8Array {
    assert(this._x != null, "uninitialized access");
    return this._x;
  }

  set x(value: Uint8Array) {
    this._x = value;
  }

  get y(): Uint8Array {
    assert(this._y != null, "uninitialized access");
    return this._y;
  }

  set y(value: Uint8Array) {
    this._y = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      x: marshal.bytes.toJSON(this.x),
      y: marshal.bytes.toJSON(this.y),
    };
  }
}
