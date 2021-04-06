import { Suspense } from 'react';
import { Router } from "@reach/router"
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import ProtectedRoute from './ProtectedRoute';
import Spinner from './Spinner';
import Header from './Header';
import Flash from './Flash';
import GenerateResetToken from './GenerateResetToken';
import ResetPassword from './ResetPassword';

const Routes = () => (
  <div>
    <Header />
    <Flash />
    <Suspense fallback={<Spinner />}>
      <Router>
        <Login path="/login" />
        <SignUp path="/signup" />
        <GenerateResetToken path="/generate-reset-token" />
        <ResetPassword path="/reset-password/:resetToken" />
        <ProtectedRoute as={Dashboard} path="/" />
        <ProtectedRoute as={Dashboard2} path="/dashboard" />
      </Router>
    </Suspense>
  </div>
);

export default Routes;
