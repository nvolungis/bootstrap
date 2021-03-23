import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import GlobalProvider from './GlobalContext';
import Spinner from './Spinner';

const Providers = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <GlobalProvider>
        <Suspense fallback={<Spinner />}>
          {children}
        </Suspense>
      </GlobalProvider>
    </RelayEnvironmentProvider>
  );
}

export default Providers;
