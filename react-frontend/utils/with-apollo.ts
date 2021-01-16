import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const isBrowser = typeof window !== 'undefined';

const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:7777/graphql',
        credentials: 'include',
      }),
  connectToDevTools: isBrowser,
    credentials: 'include',
  cache: new InMemoryCache(),
  ssrMode: true
});

export const withApollo = createWithApollo(client);