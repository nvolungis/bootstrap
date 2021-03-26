import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { Redirect } from '@reach/router';
import { useGlobalContext } from './GlobalContext';

const LoginMutation = `
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
  const [loginResult, login] = useMutation(LoginMutation);
  // const { token, setToken } = useGlobalContext();

  // if (token) {
  //   return <Redirect to="/" noThrow={true}/>
  // }

  const onSubmit = () => {
    const variables = { input: { login: { email, password } } };
    console.log(variables);
    login(variables).then(result => {
      console.log(result);
      // setToken(data.login.tokenCombined);
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
