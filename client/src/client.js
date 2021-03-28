import { createClient } from 'urql';
import { makeOperation, fetchExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

const RefreshMutation = `
  mutation refreshMutation($input: RefreshInput!) {
    refresh(input: $input) {
      combinedToken
      combinedRefresh
    }
  }`;

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

const getClient = (onAuthError, onRefresh) => {
  const getAuth = async ({ authState, mutate }) => {
    if (!authState || !authState.token) {
      const token = localStorage['token'];
      const refresh = localStorage['refresh'];

      return { token, refresh }
    }

    const {data} = await mutate(RefreshMutation, {
      input: {
        refresh: {
          refresh: authState?.refresh
        }
      }
    });

    if (data) {
      console.log('got a refresh token');
      const token = data.refresh.combinedToken;
      const refresh = data.refresh.combinedRefresh;
      onRefresh({ token, refresh });
      return { token, refresh }
    }

    console.log('not logged in, clearing token')
    setTimeout(() => {
      localStorage.clear();
      onAuthError();
    })
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
    // suspense: true,
  });
}

export default getClient;
