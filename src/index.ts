import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import config from "./mikro-orm.config";
import { Protocol } from "./entities/Protocol";
import crawlerRun from "./dataFeed/index";
import _ from "lodash";
import { types } from "pg";

// import { dbEntryChecker } from "./dataFeed/maker/crawler";

// import get_apollo_client from "./apollo/client";
// import { makerGraphUrl } from "./constants";
// import { gql } from "@apollo/client/core";

const main = async () => {
  const orm = await MikroORM.init(config);
  types.setTypeParser(1700, (str) => str);
  await orm.getMigrator().up();

  //testing db
  const testUser = orm.em.create(User, { user_address: "gilfoyle.eth" });
  await orm.em.persistAndFlush(testUser);

  // adding protocols to initialize db
  const protocolToInitialize = ["makerDAO"];
  await _.forEach(protocolToInitialize, async (protocolName) => {
    const protocolOnDb = await orm.em.findOne(Protocol, { name: protocolName });
    if (protocolOnDb === null) {
      const protocolObj = orm.em.create(Protocol, { name: protocolName });
      await orm.em.persistAndFlush(protocolObj);
    }
  });

  // //testing bigint type
  // const testm = await orm.em.findOne(Protocol, { name: "makerDAO" });

  //testing functions of maker crawler
  // const [check] = await dbEntryChecker(orm, User, {
  //   user_address: "0x72ba1965320ab5352fd6d68235cc3c5306a6ffa2",
  // });

  // console.log(check);

  //checking crawlers
  await crawlerRun();
};

main();
