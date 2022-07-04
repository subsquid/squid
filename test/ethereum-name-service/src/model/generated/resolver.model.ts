import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
  OneToMany as OneToMany_,
} from "typeorm";
import { Domain } from "./domain.model";
import { Account } from "./account.model";
import { ResolverEvent } from "./resolverEvent.model";

@Entity_()
export class Resolver {
  constructor(props?: Partial<Resolver>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Index_()
  @ManyToOne_(() => Domain, { nullable: true })
  domain!: Domain | undefined | null;

  @Column_("bytea", { nullable: false })
  address!: Uint8Array;

  @Index_()
  @ManyToOne_(() => Account, { nullable: true })
  addr!: Account | undefined | null;

  @Column_("bytea", { nullable: true })
  contentHash!: Uint8Array | undefined | null;

  @Column_("text", { array: true, nullable: true })
  texts!: string[] | undefined | null;

  @Column_("numeric", { array: true, nullable: true })
  coinTypes!: bigint[] | undefined | null;

  @OneToMany_(() => ResolverEvent, (e) => e.resolver)
  events!: ResolverEvent[];
}
