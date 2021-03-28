import styled from 'styled-components';
import { useMutation } from 'urql';
import { useGlobalContext } from './GlobalContext';

const Button = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
  border: none;
  cursor: pointer;
`;

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
  const { setTokens } = useGlobalContext();
   const [, logout] = useMutation(LogoutMutation);

  return (
    <Button
      onClick={() => {
        logout({input: {}}).then(() => {
          setTokens({});
        });
      }}>
        Logout
    </Button>
  );
};

export default LogoutButton;
