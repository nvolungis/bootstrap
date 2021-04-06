import { useState } from 'react';
import { useMutation } from 'urql';
import { useGlobalContext } from './GlobalContext';
import { Form, FormGroup, FormSubmit } from './Form';

const createUserMutation = `
  mutation SignUpUserMutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        name
        email
      }
    }
  }`;

const SignUp = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [, createUser] = useMutation(createUserMutation);
  const { setFlash } = useGlobalContext();

  const onSubmit = () => {
    const variables = { input: { user: { name, email, password } } };
    createUser(variables).then(({data}) => {
      setFlash(`User ${data.createUser.user.email} created`);
      navigate('/login');
    });
  };

  return (
    <Form title="Sign Up" onSubmit={onSubmit}>
      <FormGroup value={name} setValue={setName} label="Name" />
      <FormGroup value={email} setValue={setEmail} label="Email" />
      <FormGroup value={password} setValue={setPassword} label="Password" type="password" />
      <FormSubmit />
    </Form>
  );
};

export default SignUp;
