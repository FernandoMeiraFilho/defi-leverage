import { BigIntType, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Protocol {
  @PrimaryKey()
  protocol_id!: number;

  @Property()
  name!: string;

  @Property({ default: 0, type: BigIntType })
  last_updated_block!: number;

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
