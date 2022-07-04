import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
} from "typeorm";
import * as marshal from "./marshal";
import { Resolver } from "./resolver.model";
import {
  ResolverEventKind,
  fromJsonResolverEventKind,
} from "./_resolverEventKind";

@Entity_()
export class ResolverEvent {
  constructor(props?: Partial<ResolverEvent>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Index_()
  @ManyToOne_(() => Resolver, { nullable: false })
  resolver!: Resolver;

  @Column_("int4", { nullable: false })
  blockNumber!: number;

  @Column_("bytea", { nullable: false })
  transactionID!: Uint8Array;

  @Column_("jsonb", {
    transformer: {
      to: (obj) => obj.toJSON(),
      from: (obj) => fromJsonResolverEventKind(obj),
    },
    nullable: false,
  })
  kind!: ResolverEventKind;
}
