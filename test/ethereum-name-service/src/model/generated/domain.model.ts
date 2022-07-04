import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
  OneToMany as OneToMany_,
} from "typeorm";
import * as marshal from "./marshal";
import { Account } from "./account.model";
import { Resolver } from "./resolver.model";
import { DomainEvent } from "./domainEvent.model";

@Entity_()
export class Domain {
  constructor(props?: Partial<Domain>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Column_("text", { nullable: true })
  name!: string | undefined | null;

  @Column_("text", { nullable: true })
  labelName!: string | undefined | null;

  @Column_("bytea", { nullable: true })
  labelhash!: Uint8Array | undefined | null;

  @Index_()
  @ManyToOne_(() => Domain, { nullable: true })
  parent!: Domain | undefined | null;

  @OneToMany_(() => Domain, (e) => e.parent)
  subdomains!: Domain[];

  @Index_()
  @ManyToOne_(() => Account, { nullable: true })
  resolvedAddress!: Account | undefined | null;

  @Index_()
  @ManyToOne_(() => Account, { nullable: false })
  owner!: Account;

  @Index_()
  @ManyToOne_(() => Resolver, { nullable: true })
  resolver!: Resolver | undefined | null;

  @Column_("numeric", {
    transformer: marshal.bigintTransformer,
    nullable: true,
  })
  ttl!: bigint | undefined | null;

  @Column_("bool", { nullable: false })
  isMigrated!: boolean;

  @Column_("numeric", {
    transformer: marshal.bigintTransformer,
    nullable: false,
  })
  createdAt!: bigint;

  @OneToMany_(() => DomainEvent, (e) => e.domain)
  events!: DomainEvent[];
}
