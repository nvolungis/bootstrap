import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import Spinner from './Spinner';
import Login from './Login';

const { Suspense } = React;

const StocksQuery = graphql`
  query AppStockQuery {
    stocks {
      id
      name
      ticker
      price
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, StocksQuery, { });

function App(props) {
  const data = usePreloadedQuery(StocksQuery, props.preloadedQuery);

  return (
    <div>
      <header>
        <h1>stocks</h1>
      </header>

      <Login />

      <ul>
        {data.stocks.map(stock => (
          <li key={stock.id}>
            <div>name: {stock.name}</div>
            <div>ticker: {stock.ticker}</div>
            <div>price: {stock.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<Spinner />}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
