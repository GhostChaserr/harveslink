import { ApolloClient } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/cache';

import config from '../config';

const httpLink = createHttpLink({
  uri: `${config.API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // Retrieve token from cookies
  const token = sessionStorage.getItem('session');

  // Append token to headers
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
