import { Router, Link } from "@reach/router"
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import LogoutButton from './LogoutButton';
import ProtectedRoute from './ProtectedRoute';
import { useGlobalContext } from './GlobalContext';

const Routes = () => {
  const { token } = useGlobalContext();

  return (
    <div>
      <header>
        <nav>
          {token && (
            <>
              <LogoutButton />
              <Link to="/">Dash</Link>
              <Link to="/dashboard">Dash2</Link>
            </>
          )}
        </nav>
      </header>
      <Router>
        <Login path="/login" />
        <SignUp path="/signup" />
        <ProtectedRoute as={Dashboard} path="/" />
        <ProtectedRoute as={Dashboard2} path="/dashboard" />
      </Router>
    </div>
  );
};

export default Routes;
