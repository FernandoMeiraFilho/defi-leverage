import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Token {
  @PrimaryKey()
  token_id!: number;

  @Property()
  token_address!: string;

  @Property()
  token_ECR_code!: string;

  @Property()
  token_code_on_protocol!: string;
}
