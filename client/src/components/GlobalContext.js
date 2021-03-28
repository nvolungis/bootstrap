import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

const Provider = ({ children }) => {
  const [{token, refresh}, setTokens] = useState({
    token: localStorage['token'],
    refresh: localStorage['refresh'],
  });

  const setTokensAndPersist = ({ token, refresh }) => {
    if (token === undefined || token === null) {
      delete localStorage['token'];
    } else {
      localStorage['token'] = token;
    }

    if (refresh === undefined || refresh === null) {
      delete localStorage['refresh'];
    } else {
      localStorage['refresh'] = refresh;
    }

    setTokens({ token, refresh });
  }

  return (
    <GlobalContext.Provider value={{
      token,
      refresh,
      setTokens: setTokensAndPersist,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
