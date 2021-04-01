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

const Reset = () => {

}
