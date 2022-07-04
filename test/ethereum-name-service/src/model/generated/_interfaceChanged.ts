import assert from "assert";
import * as marshal from "./marshal";

export class InterfaceChanged {
  public readonly isTypeOf = "InterfaceChanged";
  private _interfaceID!: Uint8Array;
  private _implementer!: Uint8Array;

  constructor(props?: Partial<Omit<InterfaceChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._interfaceID = marshal.bytes.fromJSON(json.interfaceID);
      this._implementer = marshal.bytes.fromJSON(json.implementer);
    }
  }

  get interfaceID(): Uint8Array {
    assert(this._interfaceID != null, "uninitialized access");
    return this._interfaceID;
  }

  set interfaceID(value: Uint8Array) {
    this._interfaceID = value;
  }

  get implementer(): Uint8Array {
    assert(this._implementer != null, "uninitialized access");
    return this._implementer;
  }

  set implementer(value: Uint8Array) {
    this._implementer = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      interfaceID: marshal.bytes.toJSON(this.interfaceID),
      implementer: marshal.bytes.toJSON(this.implementer),
    };
  }
}
