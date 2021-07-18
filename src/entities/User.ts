import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  user_id!: number;

  @Property()
  user_address!: string;

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
