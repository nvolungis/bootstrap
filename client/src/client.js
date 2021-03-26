import { createClient } from 'urql';
import { makeOperation, fetchExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
};

const didAuthError = ({ error }) => {
  return error.graphQLErrors.some(e => e.message.includes('Not logged in'));
};

const getClient = (onAuthError) => {
  const getAuth = async ({ authState }) => {
    if (!authState || !authState.token) {
      const token = localStorage['token'];
      return { token }
    }

    localStorage.clear();
    onAuthError();
    return null;
  };

  return createClient({
    url: 'http://localhost:4000',
    fetchOptions: () => ({
      headers: {
        'Access-Control-Request-Headers': 'Content-Type',
      },
      credentials: "include",
    }),
    exchanges: [
      authExchange({ getAuth, addAuthToOperation, didAuthError}),
      fetchExchange,
    ],
    maskTypename: true,
  });
}

export default getClient;
