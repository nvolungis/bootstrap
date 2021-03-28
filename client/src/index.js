import './index.css';
import React, { Suspense, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'urql';
import GlobalProvider, { useGlobalContext } from './components/GlobalContext';
import Spinner from './components/Spinner';
import Routes from './components/Routes';
import createClient from './client';
import { redirectTo } from '@reach/router';

const Urql = ({ children, isLoggedIn }) => {
  const { setTokens } = useGlobalContext();
  const client = useMemo(() =>
    createClient(() => {
      setTokens({});
      redirectTo('/login');
    }, (tokens) => {
      setTokens(tokens);
    }), [setTokens]);

  return (
    <Provider value={client}>
      {children}
    </Provider>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <GlobalProvider>
        <Urql>
          <Suspense fallback={<Spinner />}>
            <Routes />
          </Suspense>
        </Urql>
      </GlobalProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
