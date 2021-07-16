import { gql } from "@apollo/client/core";
import { makerGraphUrl } from "../../constants";
import get_apollo_client from "../../apollo/client";

export const getLogSet = async (blocknumber: number): Promise<any> => {
  const client = await get_apollo_client(makerGraphUrl);

  const query = await client.query({
    query: gql`
      query get_initial_vaults($lastBlockNumber: BigInt) {
        vaultLogs(
          orderBy: block
          orderDirection: asc
          first: 1000
          where: { block_gt: $lastBlockNumber }
        ) {
          block
          timestamp
          vault {
            handler
            collateralType {
              id
            }
            collateral
            debt
            owner {
              address
            }
          }
        }
      }
    `,
    variables: { lastBlockNumber: blocknumber },
  });

  return query.data.vaultLogs;
};
