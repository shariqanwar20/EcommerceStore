import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
    uri: "http://localhost:8888/.netlify/functions/store",
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