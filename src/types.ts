// import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import {
  AbstractSqlConnection,
  AbstractSqlDriver,
  EntityManager,
} from "@mikro-orm/postgresql";

export type MyContext = {
  em: EntityManager<AbstractSqlDriver<AbstractSqlConnection>>;
};
