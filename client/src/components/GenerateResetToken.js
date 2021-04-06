import { useState } from 'react';
import { Redirect } from '@reach/router';
import { useMutation } from 'urql';
import { Form, FormGroup, FormSubmit } from './Form';
import { useGlobalContext } from './GlobalContext';

const GenerateResetTokenMutation = `
  mutation GenerateResetToken ($input: GenerateResetTokenInput!) {
    generateResetToken(input: $input) {
      user {
        email
      }
    }
  }
`

const GenerateResetToken = () => {
  const [email, setEmail] = useState();
  const { token, setFlash } = useGlobalContext();
  const [, generateToken] = useMutation(GenerateResetTokenMutation);

  if (token) {
    return <Redirect to="/" noThrow={true}/>
  }

  const onSubmit = () => {
    const variables = { input: { generateResetToken: { email } } };
    generateToken(variables).then(({data, error}) => {
      if (data) {
        const { email } = data.generateResetToken.user;
        setFlash(`An email with instructions has been sent to ${email}.`);
      }
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup value={email} setValue={setEmail} label="Email" />
      <FormSubmit />
    </Form>
  );
}

export default GenerateResetToken;
