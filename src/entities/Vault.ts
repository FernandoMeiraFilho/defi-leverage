import {
  Entity,
  EntityProperty,
  ManyToOne,
  Platform,
  PrimaryKey,
  Property,
  Type,
} from "@mikro-orm/core";

import { Protocol } from "./Protocol";
import { Token } from "./Token";
import { User } from "./User";

class HighPrecisionType extends Type<number, string> {
  convertToDatabaseValue(value: number, _platform: Platform): string {
    return value.toString();
  }

  convertToJSValue(value: any, _platform: Platform): any {
    return new Number(value);
  }

  getColumnType(_prop: EntityProperty, _platform: Platform): string {
    return `numeric(36, 18)`;
  }
}

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

  @Property({ type: HighPrecisionType })
  debtAmount!: number;

  @Property({ type: HighPrecisionType })
  collateralAmount!: number;

  @Property({ type: HighPrecisionType })
  liquidationPrice!: number;
}
