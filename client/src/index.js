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
  const client = useMemo(() => {
    const c = createClient({
      onAuthError: () => {
        setTokens({});
        redirectTo('/login');
      },
      onRefresh: (tokens) => setTokens(tokens),
    });

    c.subscribeToDebugTarget(event => {
      if (event.source === 'fetchExchange') {
        if (event.type === "fetchSuccess") {
          console.log(event.data.value.data)
        }
      }
    });

    return c
  },
  [setTokens]
);

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
