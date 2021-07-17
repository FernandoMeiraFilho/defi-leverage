import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Protocol } from "./Protocol";
import { Token } from "./Token";
import { User } from "./User";

@Entity()
export class Vault {
  @PrimaryKey()
  vault_id!: number;

  @ManyToOne()
  user_id!: User;

  @ManyToOne()
  protocol_id!: Protocol;

  @ManyToOne()
  collateral_token_id!: Token;

  @ManyToOne()
  debt_token_id!: Token;

  @Property()
  vault_address!: string;

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "date" })
  dateCreated = new Date();

  @Property()
  debtAmount!: number;

  @Property()
  collateralAmount!: number;

  @Property()
  liquidationPrice!: number;
}
