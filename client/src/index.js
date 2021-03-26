import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createClient, Provider, cacheExchange } from 'urql';
import GlobalProvider from './GlobalContext';
import Spinner from './Spinner';
import Router from './Router';
// import schema from './schema.json';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: () => {
    const token = localStorage['token'];
    return {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Access-Control-Request-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    };
  },
  maskTypename: true,
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <Provider value={client}>
        <Suspense fallback={<Spinner />}>
          <Router />
        </Suspense>
      </Provider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
