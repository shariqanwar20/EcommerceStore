import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const httpLink = new HttpLink({
    uri: "https://countries.trevorblades.com",
    fetch,
  });

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;