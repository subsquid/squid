import assert from "assert";
import * as marshal from "./marshal";
import { Resolver } from "./resolver.model";

export class NewResolver {
  public readonly isTypeOf = "NewResolver";
  private _resolver!: string;

  constructor(props?: Partial<Omit<NewResolver, "toJSON">>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._resolver = marshal.string.fromJSON(json.resolver);
    }
  }

  get resolver(): string {
    assert(this._resolver != null, "uninitialized access");
    return this._resolver;
  }

  set resolver(value: string) {
    this._resolver = value;
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      resolver: this.resolver,
    };
  }
}
