import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import config from "./mikro-orm.config";
import { Protocol } from "./entities/Protocol";
// import crawlerRun from "./dataFeed/index";
import _ from "lodash";
import { types } from "pg";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TokenResolver } from "./resolvers/tokens";
import { ProtocolResolver } from "./resolvers/protocols";
import { CollateralResolver } from "./resolvers/collaterals";

// import {
//   AbstractSqlConnection,
//   AbstractSqlDriver,
//   EntityManager,
// } from "@mikro-orm/postgresql";

// type EM = EntityManager<AbstractSqlDriver<AbstractSqlConnection>>;

const main = async () => {
  const orm = await MikroORM.init(config);
  types.setTypeParser(1700, (str) => str);
  await orm.getMigrator().up();

  // setting graphql endpoint
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TokenResolver, ProtocolResolver, CollateralResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started");
  });

  // adding protocols to initialize db
  const protocolToInitialize = ["Maker"];
  for (let protocolName of protocolToInitialize) {
    const protocolOnDb = await orm.em.findOne(Protocol, { name: protocolName });
    if (protocolOnDb === null) {
      const protocolObj = orm.em.create(Protocol, { name: protocolName });
      await orm.em.persistAndFlush(protocolObj);
    }
  }

  // let test: EntityManager<AbstractSqlDriver<AbstractSqlConnection>>;
  // test = ({orm.em});

  // testing query
  // const em: EM = orm.em;
  // const testQuery = await em
  //   .createQueryBuilder(Vault, "v")
  //   .select([
  //     "t.token_code_on_protocol",
  //     "v.liquidation_price",
  //     "sum(v.collateral_amount) as collateral_amount",
  //   ])
  //   .join("t.token_id", "t")
  //   .groupBy(["t.token_code_on_protocol", "v.liquidation_price"])
  //   .getQuery();

  //checking crawlers
  // await crawlerRun();
};

main();
