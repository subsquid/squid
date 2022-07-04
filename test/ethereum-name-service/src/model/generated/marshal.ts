import assert from "assert";

export interface Marshal<T, S> {
  fromJSON(value: unknown): T;
  toJSON(value: T): S;
}

export const string: Marshal<string, string> = {
  fromJSON(value: unknown): string {
    assert(typeof value === "string", "invalid String");
    return value;
  },
  toJSON(value) {
    return value;
  },
};

export const id = string;

export const int: Marshal<number, number> = {
  fromJSON(value: unknown): number {
    assert(Number.isInteger(value), "invalid Int");
    return value as number;
  },
  toJSON(value) {
    return value;
  },
};

export const float: Marshal<number, number> = {
  fromJSON(value: unknown): number {
    assert(typeof value === "number", "invalid Float");
    return value as number;
  },
  toJSON(value) {
    return value;
  },
};

export const boolean: Marshal<boolean, boolean> = {
  fromJSON(value: unknown): boolean {
    assert(typeof value === "boolean", "invalid Boolean");
    return value;
  },
  toJSON(value: boolean): boolean {
    return value;
  },
};

export const bigint: Marshal<bigint, string> = {
  fromJSON(value: unknown): bigint {
    assert(typeof value === "string", "invalid BigInt");
    return BigInt(value);
  },
  toJSON(value: bigint): string {
    return value.toString();
  },
};

// credit - https://github.com/Urigo/graphql-scalars/blob/91b4ea8df891be8af7904cf84751930cc0c6613d/src/scalars/iso-date/validator.ts#L122
const RFC_3339_REGEX =
  /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?([Z])$/;

function isIsoDateTimeString(s: string): boolean {
  return RFC_3339_REGEX.test(s);
}

export const datetime: Marshal<Date, string> = {
  fromJSON(value: unknown): Date {
    assert(typeof value === "string", "invalid DateTime");
    assert(isIsoDateTimeString(value), "invalid DateTime");
    return new Date(value);
  },
  toJSON(value: Date): string {
    return value.toISOString();
  },
};

export const bytes: Marshal<Uint8Array, string> = {
  fromJSON(value: unknown): Buffer {
    assert(typeof value === "string", "invalid Bytes");
    assert(value.length % 2 === 0, "invalid Bytes");
    assert(/^0x[0-9a-f]+$/i.test(value), "invalid Bytes");
    return Buffer.from(value.slice(2), "hex");
  },
  toJSON(value: Uint8Array): string {
    if (Buffer.isBuffer(value)) {
      return "0x" + value.toString("hex");
    } else {
      return (
        "0x" +
        Buffer.from(value.buffer, value.byteOffset, value.byteLength).toString(
          "hex"
        )
      );
    }
  },
};

export function fromList<T>(list: unknown, f: (val: unknown) => T): T[] {
  assert(Array.isArray(list));
  return list.map((val) => f(val));
}

export function nonNull<T>(val: T | undefined | null): T {
  assert(val != null, "non-nullable value is null");
  return val;
}

export const bigintTransformer = {
  to(x?: bigint) {
    return x?.toString();
  },
  from(s?: string): bigint | undefined {
    return s == null ? undefined : BigInt(s);
  },
};
