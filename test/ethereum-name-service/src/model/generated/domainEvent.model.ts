import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
} from "typeorm";
import * as marshal from "./marshal";
import { Domain } from "./domain.model";
import { DomainEventKind, fromJsonDomainEventKind } from "./_domainEventKind";

@Entity_()
export class DomainEvent {
  constructor(props?: Partial<DomainEvent>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Index_()
  @ManyToOne_(() => Domain, { nullable: false })
  domain!: Domain;

  @Column_("int4", { nullable: false })
  blockNumber!: number;

  @Column_("bytea", { nullable: false })
  transactionID!: Uint8Array;

  @Column_("jsonb", {
    transformer: {
      to: (obj) => obj.toJSON(),
      from: (obj) => fromJsonDomainEventKind(obj),
    },
    nullable: false,
  })
  kind!: DomainEventKind;
}
