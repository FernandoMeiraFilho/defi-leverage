import {
  Entity,
  EntityProperty,
  Platform,
  PrimaryKey,
  Property,
  Type,
} from "@mikro-orm/core";
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

@Entity()
export class Token {
  @PrimaryKey()
  token_id!: number;

  @Property()
  token_address!: string;

  @Property()
  token_ERC_code!: string;

  @Property()
  token_code_on_protocol!: string;

  @Property()
  decimals!: number;

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ default: 0, type: DecimalType })
  liquidation_ratio_maker!: number; //it's easier to store as string and convert after, damn TS/JS non float support..
}
