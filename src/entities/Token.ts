import {
  Entity,
  EntityProperty,
  Platform,
  PrimaryKey,
  Property,
  Type,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
// import Decimal from "decimal.js";

class DecimalType extends Type<number, string> {
  convertToDatabaseValue(value: number, _platform: Platform): string {
    return value.toString();
  }

  convertToJSValue(value: any, _platform: Platform): any {
    return new Number(value);
  }

  getColumnType(_prop: EntityProperty, _platform: Platform): string {
    return `double precision`;
  }
}

@ObjectType()
@Entity()
export class Token {
  @Field(() => Int)
  @PrimaryKey()
  token_id!: number;

  @Field(() => String)
  @Property()
  token_address!: string;

  @Field(() => String)
  @Property()
  token_ERC_code!: string;

  @Field(() => String)
  @Property()
  token_code_on_protocol!: string;

  @Field(() => Int)
  @Property()
  decimals!: number;

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ default: 0, type: DecimalType })
  liquidation_ratio_maker!: number; //it's easier to store as string and convert after, damn TS/JS non float support..
}
