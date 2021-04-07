import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

const safeSet = (key, value) => {
  if (value === undefined || value === null) {
    delete localStorage[key];
  } else {
    localStorage[key] = value;
  }
}

const Provider = ({ children }) => {
  const [{token, refresh, email, name}, setTokens] = useState({
    token: localStorage['token'],
    refresh: localStorage['refresh'],
    name: localStorage['name'],
    email: localStorage['email'],
  });

  const [flash, setFlash] = useState();

  const setTokensAndPersist = ({ token, refresh, email, name }) => {
    safeSet('token', token);
    safeSet('refresh', refresh);
    safeSet('email', email);
    safeSet('name', name);

    setTokens({ token, refresh, email, name });
  }

  return (
    <GlobalContext.Provider value={{
      token,
      refresh,
      email,
      name,
      flash,
      setTokens: setTokensAndPersist,
      setFlash,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
