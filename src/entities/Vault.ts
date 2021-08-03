import {
  Entity,
  EntityProperty,
  ManyToOne,
  Platform,
  PrimaryKey,
  Property,
  Type,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

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
@ObjectType()
@Entity()
export class Vault {
  @Field(() => Int)
  @PrimaryKey()
  vault_id!: number;

  @Field(() => Int)
  @ManyToOne()
  user_id!: User;

  @Field(() => Int)
  @ManyToOne()
  protocol_id!: Protocol;

  @Field(() => Int)
  @ManyToOne()
  collateral_token_id!: Token;

  @Field(() => Int)
  @ManyToOne()
  debt_token_id!: Token;

  @Field()
  @Property()
  vault_address!: string;

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  dateCreated = new Date();

  @Field()
  @Property({ type: HighPrecisionType })
  debtAmount!: number;

  @Field()
  @Property({ type: HighPrecisionType })
  collateralAmount!: number;

  @Field()
  @Property({ type: HighPrecisionType })
  liquidationPrice!: number;
}
