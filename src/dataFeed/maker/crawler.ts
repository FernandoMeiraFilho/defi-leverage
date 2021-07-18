import { MikroORM } from "@mikro-orm/core";
import { Protocol } from "../../entities/Protocol";
import config from "../../mikro-orm.config";
import { getLogSet } from "./queries";
import _ from "lodash";
import chalk from "chalk";
import { User } from "../../entities/User";
import { Token } from "../../entities/Token";
import { Vault } from "../../entities/Vault";

import { ethers } from "ethers";
import { ilkRegistryAddress } from "src/constants";
import { provider } from "src/rpc_client/client";
import ilkRegistryABI from "../../ethereum/ABIs/IlkRegistry.json";
import erc20ABI from "../../ethereum/ABIs/ERC20.json";

async function dbEntryChecker(dbInstance: any, dbEntity: any, entryValue: any) {
  const dbSearch = dbInstance.em.findOne(dbEntity, entryValue);
  const dbCheckResult = dbSearch === null ? true : false;
  return [dbSearch, dbCheckResult];
}

async function addNewUser(dbInstance: any, userAddress: string) {
  const newUser = dbInstance.em.create(User, { userAddress: userAddress });
  dbInstance.em.persistAndFlush(newUser);
}

async function addNewCollateral(dbInstance: any, tokenName: string) {}

export default async () => {
  const orm = await MikroORM.init(config);

  let makerInstance;
  while (true) {
    makerInstance = await orm.em.findOne(Protocol, {
      name: "makerDAO",
    });

    if (makerInstance === null) {
      console.log(chalk.red(`Couldn't find makerDAO on protocol table`));
      break;
    }

    //run query until query.data.length === 0
    const data = await getLogSet(Number(makerInstance.last_updated_block));
    if (data.length > 0) {
      //GETTING ALL THE USERS AND COLLATERALS TO BE ADDED BEFOREHAND
      //use lodash to get all unique users and collaterals
      const all_users = _.uniq(
        _.forEach(data, (log) => {
          return log.vault.owner.address;
        })
      );

      const all_collaterals = _.uniq(
        _.forEach(data, (log) => {
          return log.vault.collateralType.id;
        })
      );

      //check if user is on db, if NOT add it to new_users Obj
      const newUsers = _.map(all_users, async (userAddress) => {
        const [, isOnDb] = await dbEntryChecker(orm, User, {
          address: userAddress,
        });
        if (!isOnDb) {
          return orm.em.create(User, { addreess: userAddress });
        }
      });

      //check if collateral is on db, if NOT add it to new_collaterals Obj
      const newCollaterals = _.map(
        all_collaterals,
        async (collateralCode: string) => {
          const [, isOnDb] = await dbEntryChecker(orm, Token, {
            token_code_on_protocol: collateralCode,
          });
          if (!isOnDb) {
            //getting on chain data from the DAI ILK registry
            const ilkRegistry = new ethers.Contract(
              ilkRegistryAddress,
              ilkRegistryABI,
              provider
            );

            const tokenQueryILK = await ilkRegistry.ilkData(
              ethers.utils.formatBytes32String(collateralCode)
            );
            const tokenAddress = tokenQueryILK.gem;

            const ERC20 = new ethers.Contract(tokenAddress, erc20ABI, provider);
            const tokenCode = await ERC20.symbol();
            const tokenDecimals = await ERC20.decimals();

            return orm.em.create(Token, {
              token_address: tokenAddress,
              token_ERC_code: tokenCode,
              token_code_on_protocol: collateralCode,
              decimals: tokenDecimals,
            });
          }
        }
      );

      //push newCollaterals and newUsers to db
      await orm.em.persistAndFlush(newUsers);
      await orm.em.persistAndFlush(newCollaterals);

      // create new vaults objects
      const newVaults = [];
      _.forEach(data, async (vaultLog) => {
        const [storedVault, isOnDb] = await dbEntryChecker(orm, Vault, {
          vault_address: vaultLog.vault.handler,
        });
        if (!isOnDb) {
        }
      });

      //push to database

      //update lastblock data
    } else {
      console.log(
        chalk.yellow("There are no updates to be processed at this time.")
      );
      break;
    }

    //add vault..
  }

  //check lastUpdatedBlock on db
};
