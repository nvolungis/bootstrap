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

const ResetPassword = ({ resetToken, navigate }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { token, setFlash } = useGlobalContext();
  const [, reset] = useMutation(ResetPasswordMutation);

  if (token) {
    return <Redirect to="/" noThrow={true}/>
  }

  const onSubmit = () => {
    const variables = { input: { resetPassword: { resetToken, password, passwordConfirmation } } };
    reset(variables).then(({data, error}) => {
      if (data) {
        const { email } = data.resetPassword.user;
        setFlash(`Password for ${email} has been reset`);
        navigate('/login');
      }
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
