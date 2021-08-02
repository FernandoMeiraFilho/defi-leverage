import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";

export type MyContext = {
  orm: MikroORM<IDatabaseDriver<Connection>>;
};
