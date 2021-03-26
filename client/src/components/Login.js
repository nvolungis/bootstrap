import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from 'urql';
import { Redirect } from '@reach/router';
import { useGlobalContext } from './GlobalContext';

const LoginMutation = gql`
  mutation loginMutation($input: LoginInput!) {
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
  const [, login] = useMutation(LoginMutation);
  const { token, setToken } = useGlobalContext();

  if (token) {
    return <Redirect to="/" noThrow={true}/>
  }

  const onSubmit = () => {
    const variables = { input: { login: { email, password } } };
    login(variables).then(({data}) => {
      setToken(data.login.tokenCombined);
    });
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
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
