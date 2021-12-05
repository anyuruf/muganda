import { setClient } from 'glimmer-apollo';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';

export default function setupApolloClient(context) {
  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
  });

  // Cache implementation
  const cache = new InMemoryCache();

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  });

  // Set default apollo client for Glimmer Apollo
  setClient(context, apolloClient);
}
