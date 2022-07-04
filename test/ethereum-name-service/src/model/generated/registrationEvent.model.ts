import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  ManyToOne as ManyToOne_,
  Index as Index_,
} from "typeorm";
import * as marshal from "./marshal";
import { Registration } from "./registration.model";
import {
  RegistrationEventKind,
  fromJsonRegistrationEventKind,
} from "./_registrationEventKind";

@Entity_()
export class RegistrationEvent {
  constructor(props?: Partial<RegistrationEvent>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Index_()
  @ManyToOne_(() => Registration, { nullable: false })
  registration!: Registration;

  @Column_("int4", { nullable: false })
  blockNumber!: number;

  @Column_("bytea", { nullable: false })
  transactionID!: Uint8Array;

  @Column_("jsonb", {
    transformer: {
      to: (obj) => obj.toJSON(),
      from: (obj) => fromJsonRegistrationEventKind(obj),
    },
    nullable: false,
  })
  kind!: RegistrationEventKind;
}
