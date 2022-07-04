import { NameRegistered } from "./_nameRegistered";
import { NameRenewed } from "./_nameRenewed";
import { NameTransferred } from "./_nameTransferred";

export type RegistrationEventKind =
  | NameRegistered
  | NameRenewed
  | NameTransferred;

export function fromJsonRegistrationEventKind(
  json: any
): RegistrationEventKind {
  switch (json?.isTypeOf) {
    case "NameRegistered":
      return new NameRegistered(undefined, json);
    case "NameRenewed":
      return new NameRenewed(undefined, json);
    case "NameTransferred":
      return new NameTransferred(undefined, json);
    default:
      throw new TypeError(
        "Unknown json object passed as RegistrationEventKind"
      );
  }
}
