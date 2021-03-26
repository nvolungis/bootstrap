import React, { Suspense, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'urql';
import GlobalProvider, { useGlobalContext } from './GlobalContext';
import Spinner from './Spinner';
import Router from './Router';
import createClient from './createClient';

const Urql = ({ children, isLoggedIn }) => {
  const { setToken } = useGlobalContext();

  const client = useMemo(() => {
    return createClient(() => {
      console.log('got an auth error, nulling token')
      setToken('');
    });
  }, [setToken]);

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
            <Router />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
