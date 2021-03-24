import { useGlobalContext } from './GlobalContext';
import { Redirect } from "@reach/router"

const PrivateRoute = ({ as: Component, ...props }) => {
  const {token} = useGlobalContext();

  if (token) {
    return <Component {...props} />
  }

  return <Redirect to="/login" noThrow={true} />
};

export default PrivateRoute;
