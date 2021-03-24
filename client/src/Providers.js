import { Suspense, useRef, useCallback } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import createRelayEnvironment from './RelayEnvironment';
import GlobalProvider, { useGlobalContext } from './GlobalContext';
import Spinner from './Spinner';

const Relay = ({ children }) => {
  const { setToken } = useGlobalContext();
  const onAuthError = useCallback(() => { setToken('') }, [setToken]);
  const relayEnv = useRef(createRelayEnvironment({ onAuthError })).current;

  return (
    <RelayEnvironmentProvider environment={relayEnv}>
      {children}
    </RelayEnvironmentProvider>
  );
};

const Providers = ({ children }) => {
  return (
    <GlobalProvider>
      <Suspense fallback={<Spinner />}>
        <Relay>
          {children}
        </Relay>
      </Suspense>
    </GlobalProvider>
  );
}

export default Providers;
