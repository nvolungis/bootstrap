import styled from 'styled-components';

const FormContainer = styled.form`
  padding: 10px;
`;

const FormElem = styled.div`
  margin-bottom: 10px;
`;

const FormLabel = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #505050;
  outline: none;
  font-size: 18px;
`;

const FormError = styled.div`
  padding-bottom: 10px;
`;

const exports = {
  FormContainer,
  FormElem,
  FormLabel,
  FormInput,
  FormError,
}

export default exports;
