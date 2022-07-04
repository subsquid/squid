import { Transfer } from "./_transfer";
import { NewOwner } from "./_newOwner";
import { NewResolver } from "./_newResolver";
import { NewTTL } from "./_newTtl";

export type DomainEventKind = Transfer | NewOwner | NewResolver | NewTTL;

export function fromJsonDomainEventKind(json: any): DomainEventKind {
  switch (json?.isTypeOf) {
    case "Transfer":
      return new Transfer(undefined, json);
    case "NewOwner":
      return new NewOwner(undefined, json);
    case "NewResolver":
      return new NewResolver(undefined, json);
    case "NewTTL":
      return new NewTTL(undefined, json);
    default:
      throw new TypeError("Unknown json object passed as DomainEventKind");
  }
}
