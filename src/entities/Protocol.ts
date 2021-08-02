import { BigIntType, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Protocol {
  @Field()
  @PrimaryKey()
  protocol_id!: number;

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property({ default: 0, type: BigIntType })
  last_updated_block!: number;

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
