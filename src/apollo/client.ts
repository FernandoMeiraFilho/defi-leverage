import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import fetch from "cross-fetch";

export default async function get_apollo_client(graphUrl: string) {
  const cache: any = new InMemoryCache();
  const link: any = new (createHttpLink as any)({
    uri: graphUrl,
    fetch: fetch,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  const client: any = new ApolloClient({
    link: link,
    cache: cache,
  });

  return client;
}
