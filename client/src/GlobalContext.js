import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

const Provider = ({ children }) => {
  const [token, setToken] = useState(localStorage['token']);

  const setTokenAndPersist = (value) => {
    localStorage['token'] = value;
    setToken(value);
  };

  return (
    <GlobalContext.Provider value={{ token, setToken: setTokenAndPersist }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
