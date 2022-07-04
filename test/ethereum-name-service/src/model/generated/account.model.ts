import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  OneToMany as OneToMany_,
} from "typeorm";
import { Domain } from "./domain.model";
import { Registration } from "./registration.model";

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @OneToMany_(() => Domain, (e) => e.owner)
  domains!: Domain[];

  @OneToMany_(() => Registration, (e) => e.registrant)
  registrations!: Registration[];
}
