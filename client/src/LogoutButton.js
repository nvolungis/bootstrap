import { useMutation } from 'urql';
import { useGlobalContext } from './GlobalContext';

const LogoutMutation = `
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
   const [, logout] = useMutation(LogoutMutation);

  return (
    <button
      onClick={() => {
        console.log('lic')
        logout({input: {}}).then(() => {
          setToken("");
        });
      }}>
        logout
    </button>
  );
};

export default LogoutButton;
