import { Router } from "@reach/router"
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import LogoutButton from './LogoutButton';
import ProtectedRoute from './ProtectedRoute';
import { useGlobalContext } from './GlobalContext';

const Routes = () => {
  const { token } = useGlobalContext();

  return (
    <div>
      <header>
        <nav>
          {token && <LogoutButton />}
        </nav>
      </header>
      <Router>
        <Login path="/login" />
        <SignUp path="/signup" />
        <ProtectedRoute as={Dashboard} path="/" />
      </Router>
    </div>
  );
};

export default Routes;
