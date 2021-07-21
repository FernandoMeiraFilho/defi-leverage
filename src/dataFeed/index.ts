import { MikroORM } from "@mikro-orm/core";
import { Token } from "../entities/Token";
import config from "../mikro-orm.config";
import makerCrawler from "./maker/crawler";

export default async () => {
  // initial crucial insertions
  const orm = await MikroORM.init(config);
  const dai = orm.em.create(Token, {
    token_ERC_code: "DAI",
    token_code_on_protocol: "DAI",
    token_address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
  });
  orm.em.persistAndFlush(dai);

  //calling crawlers
  await makerCrawler();
};
