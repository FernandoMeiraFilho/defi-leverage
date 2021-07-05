import { User } from "./entities/User";
import { Protocol } from "./entities/Protocol";
import { Token } from "./entities/Token";
import { Vault } from "./entities/Vault";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [User, Protocol, Token, Vault],
  dbName: "defi",
  type: "postgresql",
  password: "defilev",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; //getting the types from the init functions to avoid type errors on index.ts
