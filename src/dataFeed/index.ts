// import {
//     ApolloClient,
//     InMemoryCache,
//     createHttpLink,
//   } from "@apollo/client/core";
//   import fetch from "cross-fetch";

//   const graphAddress: any = {
//     kovan: "https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan",
//     mainnet: "https://api.thegraph.com/subgraphs/name/aave/protocol-v2",
//   };

//   const activeQueryUrl: string = graphAddress[NETWORK];

//   const cache: any = new InMemoryCache();
//   const link: any = new (createHttpLink as any)({
//     uri: activeQueryUrl,
//     fetch: fetch,
//     defaultOptions: {
//       watchQuery: {
//         fetchPolicy: "cache-and-network",
//       },
//     },
//   });

//   export const client: any = new ApolloClient({
//     link: link,
//     cache: cache,
//   });

// use ilk registry contract 0x5a464C28D19848f44199D003BeF5ecc87d090F87
//query ilkData function with bytes32 of the ilk
// get gem address = collateral address
// check if this is already on database
// make addition before adding the vault
