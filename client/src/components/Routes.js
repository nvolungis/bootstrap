import { Suspense } from 'react';
import { Router } from "@reach/router"
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import ProtectedRoute from './ProtectedRoute';
import Spinner from './Spinner';
import Header from './Header';

const Routes = () => (
  <div>
    <Header />
    <Suspense fallback={<Spinner />}>
      <Router>
        <Login path="/login" />
        <SignUp path="/signup" />
        <ProtectedRoute as={Dashboard} path="/" />
        <ProtectedRoute as={Dashboard2} path="/dashboard" />
      </Router>
    </Suspense>
  </div>
);

export default Routes;
