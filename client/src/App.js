import React from 'react';
import Providers from './Providers';
import Router from './Router';

const App = (props) => {
  return (
    <Providers>
      <header>
        <h1>bootstrap</h1>
      </header>
      <Router />
    </Providers>
  );
}

export default App;
