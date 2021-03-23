import Login from './Login';
import Dashboard from './Dashboard';
import { useGlobalContext } from './GlobalContext';

const Router = () => {
  const { token } = useGlobalContext();

  return (
    <div>
      { token ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Router;
