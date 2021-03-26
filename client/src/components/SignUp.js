import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';

const createUserMutation = `
  mutation SignUpUserMutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        name
        email
      }
    }
  }`;

const Container = styled.div`
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [, createUser] = useMutation(createUserMutation);

  const onSubmit = () => {
    const variables = { input: { user: { name, email, password } } };
    createUser(variables).then(({data}) => {
      console.log('user created', data);
    });
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <FormElem>
        <label>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </FormElem>

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
    </Container>
  );
};

export default SignUp;
