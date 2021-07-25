import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import config from "./mikro-orm.config";
import { Protocol } from "./entities/Protocol";
import crawlerRun from "./dataFeed/index";
import _ from "lodash";
import { types } from "pg";
// import { Vault } from "./entities/Vault";

// import { dbEntryChecker } from "./dataFeed/maker/crawler";

// import get_apollo_client from "./apollo/client";
// import { makerGraphUrl } from "./constants";
// import { gql } from "@apollo/client/core";

const main = async () => {
  const orm = await MikroORM.init(config);
  types.setTypeParser(1700, (str) => str);
  await orm.getMigrator().up();

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
