import { useState } from 'react';
import styled from 'styled-components';
import graphql from 'babel-plugin-relay/macro';
// import { loadQuery, usePreloadedQuery } from 'react-relay/hooks';
import { useMutation } from 'react-relay';
import { useGlobalContext } from './GlobalContext';

const loginMutation = graphql`
  mutation LoginloginMutation ($input: LoginInput!) {
    login(input: $input) {
      tokenHeader
      tokenPayload
      tokenCombined
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [commit, _isInFlight] = useMutation(loginMutation);
  const { setToken } = useGlobalContext();

  const onSubmit = () => {
    commit({
      variables: { input: { login: { email, password } } },
      onCompleted(data) {
        // const payload = atob(data.login.tokenPayload)
        setToken(data.login.tokenCombined);
      },
      onError(error){ console.log('error', error) },
    });
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
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
        <button onClick={onSubmit}>Submit</button>
      </FormElem>
    </LoginContainer>
  );
};

export default Login;
