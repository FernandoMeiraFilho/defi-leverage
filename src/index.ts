import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import config from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const testUser = orm.em.create(User, { user_address: "gilfoyle.eth" });
  await orm.em.persistAndFlush(testUser);
};

main();

console.log("hello world");
