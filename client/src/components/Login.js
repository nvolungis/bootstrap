import { useState } from 'react';
import { useMutation, gql } from 'urql';
import { Redirect, Link } from '@reach/router';
import { useGlobalContext } from './GlobalContext';
import { Form, FormGroup, FormSubmit } from './Form';
import elements from '../elements';

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

const PasswordReset = () => {
  return (
    <elements.FormError>
      Trouble logging in? Try <Link to="/reset">Resetting password</Link>
    </elements.FormError>
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

  const onSubmit = () => {
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
    <Form onSubmit={onSubmit} title="Login Dude">
      {loginError && <elements.FormError>{loginError}</elements.FormError>}
      {invalidAttempts > 2 && <PasswordReset />}
      <FormGroup value={email} setValue={setEmail} label="Email" />
      <FormGroup value={password} setValue={setPassword} label="Password" type="password" />
      <FormSubmit />
    </Form>
  );
};

export default Login;
