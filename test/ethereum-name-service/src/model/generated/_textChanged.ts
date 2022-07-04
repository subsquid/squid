import assert from "assert";
import * as marshal from "./marshal";

export class TextChanged {
  public readonly isTypeOf = "TextChanged";
  private _key!: string;
  private _value!: string | undefined | null;

  constructor(props?: Partial<Omit<TextChanged, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._key = marshal.string.fromJSON(json.key);
      this._value =
        json.value == null ? undefined : marshal.string.fromJSON(json.value);
    }
  }

  get key(): string {
    assert(this._key != null, "uninitialized access");
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get value(): string | undefined | null {
    return this._value;
  }

  set value(value: string | undefined | null) {
    this._value = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      key: this.key,
      value: this.value,
    };
  }
}
