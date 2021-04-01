import { useState } from 'react';
import { Redirect } from '@reach/router';
import { useMutation } from 'urql';
import { Form, FormGroup, FormSubmit } from './Form';
import { useGlobalContext } from './GlobalContext';

const ResetPasswordMutation = `
  mutation ResetPassword ($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      user {
        email
      }
    }
  }
`

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const { token } = useGlobalContext();
  const [, reset] = useMutation(ResetPasswordMutation);
  const reset_token = "SEhLT01aaGxmUWpZU05sTzJjY3hvUT09"

  if (token) {
    return <Redirect to="/" noThrow={true}/>
  }

  const onSubmit = () => {
    const variables = { input: { resetPassword: { reset_token, password, passwordConfirmation } } };
    reset(variables).then(({data, error}) => {
      console.log(data);
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
      />
      <FormGroup
        value={passwordConfirmation}
        setValue={setPasswordConfirmation}
        label="Confirm"
        type="password"
      />
      <FormSubmit />
    </Form>
  );
}

export default ResetPassword;
