import { useMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { useGlobalContext } from './GlobalContext';

const logoutMutation = graphql`
  mutation LogoutButtonLogoutMutation {
    logout {
      user {
        email
      }
    }
  }
`;

const LogoutButton = () => {
  const { setToken } = useGlobalContext();
  const [commit] = useMutation(logoutMutation);

  return (
    <button
      onClick={() => {
        console.log('lic')
        commit({
          onCompleted: (data) => {
            console.log('complete')
            console.log(data);
            setToken("");
          },
          onError: (error) => {
            console.log('errr')
            console.error(error);
          },
        });
      }}>
        logout
    </button>
  );
};

export default LogoutButton;
