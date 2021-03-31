import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from 'urql';
import { Redirect, Link } from '@reach/router';
import { useGlobalContext } from './GlobalContext';

const LoginMutation = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      headerToken
      payloadToken
      combinedToken
      headerRefresh
      payloadRefresh
      combinedRefresh
    }
  }`;

const LoginContainer = styled.div`
  padding: 10px;
`;

const FormElem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #505050;
  outline: none;
  font-size: 18px;
`;

const LoginError = styled.div`
  padding-bottom: 10px;
`;

const PasswordReset = () => {
  return (
    <LoginError>
      Trouble logging in? Try <Link to="/reset">Resetting password</Link>
    </LoginError>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, login] = useMutation(LoginMutation);
  const { token, setTokens } = useGlobalContext();
  const [loginError, setLoginError] = useState();
  const [invalidAttempts, setInvalidAttempts] = useState(0);

  if (token) {
    return <Redirect to="/" noThrow={true}/>
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const variables = { input: { login: { email, password } } };
    login(variables).then(({data, error}) => {
      if (error) {
        setInvalidAttempts(invalidAttempts + 1);
        return setLoginError(error.graphQLErrors.map(({message}) => message).join(', '));
      }

      setTokens({ token: data.login.combinedToken, refresh: data.login.combinedRefresh });
    });
  };

  return (
    <LoginContainer>
      <h1>Login dude</h1>
      {loginError && <LoginError>{loginError}</LoginError>}
      {invalidAttempts > 2 && <PasswordReset />}
      <form onSubmit={onSubmit}>
        <FormElem>
          <label>
            <Label>Email</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </FormElem>

        <FormElem>
          <label>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </FormElem>

        <FormElem>
          <button type="submit">Submit</button>
        </FormElem>
      </form>
    </LoginContainer>
  );
};

export default Login;
