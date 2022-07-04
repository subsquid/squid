import assert from "assert";
import * as marshal from "./marshal";

export class NameChanged {
  public readonly isTypeOf = "NameChanged";
  private _name!: string;

  constructor(props?: Partial<Omit<NameChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._name = marshal.string.fromJSON(json.name);
    }
  }

  get name(): string {
    assert(this._name != null, "uninitialized access");
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      name: this.name,
    };
  }
}
