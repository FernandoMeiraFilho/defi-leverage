import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Protocol {
  @PrimaryKey()
  protocol_id!: number;

  @Property()
  name!: string;
}
