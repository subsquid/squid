import { AddrChanged } from "./_addrChanged";
import { MulticoinAddrChanged } from "./_multicoinAddrChanged";
import { NameChanged } from "./_nameChanged";
import { AbiChanged } from "./_abiChanged";
import { PubkeyChanged } from "./_pubkeyChanged";
import { TextChanged } from "./_textChanged";
import { ContenthashChanged } from "./_contenthashChanged";
import { InterfaceChanged } from "./_interfaceChanged";
import { AuthorisationChanged } from "./_authorisationChanged";

export type ResolverEventKind =
  | AddrChanged
  | MulticoinAddrChanged
  | NameChanged
  | AbiChanged
  | PubkeyChanged
  | TextChanged
  | ContenthashChanged
  | InterfaceChanged
  | AuthorisationChanged;

export function fromJsonResolverEventKind(json: any): ResolverEventKind {
  switch (json?.isTypeOf) {
    case "AddrChanged":
      return new AddrChanged(undefined, json);
    case "MulticoinAddrChanged":
      return new MulticoinAddrChanged(undefined, json);
    case "NameChanged":
      return new NameChanged(undefined, json);
    case "AbiChanged":
      return new AbiChanged(undefined, json);
    case "PubkeyChanged":
      return new PubkeyChanged(undefined, json);
    case "TextChanged":
      return new TextChanged(undefined, json);
    case "ContenthashChanged":
      return new ContenthashChanged(undefined, json);
    case "InterfaceChanged":
      return new InterfaceChanged(undefined, json);
    case "AuthorisationChanged":
      return new AuthorisationChanged(undefined, json);
    default:
      throw new TypeError("Unknown json object passed as ResolverEventKind");
  }
}
