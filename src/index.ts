import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import config from "./mikro-orm.config";
import { Protocol } from "./entities/Protocol";
import crawlerRun from "./dataFeed/index";
import _ from "lodash";
import { types } from "pg";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TokenResolver } from "./resolvers/token";
import { ProtocolResolver } from "./resolvers/protocol";

const main = async () => {
  const orm = await MikroORM.init(config);
  types.setTypeParser(1700, (str) => str);
  await orm.getMigrator().up();

  // setting graphql endpoint
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TokenResolver, ProtocolResolver],
      validate: false,
    }),
    context: () => ({ orm }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started");
  });

  // adding protocols to initialize db
  const protocolToInitialize = ["makerDAO"];
  for (let protocolName of protocolToInitialize) {
    const protocolOnDb = await orm.em.findOne(Protocol, { name: protocolName });
    if (protocolOnDb === null) {
      const protocolObj = orm.em.create(Protocol, { name: protocolName });
      await orm.em.persistAndFlush(protocolObj);
    }
  }

  //checking crawlers
  await crawlerRun();
};

main();
