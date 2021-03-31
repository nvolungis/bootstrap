import styled from 'styled-components';
import { useGlobalContext } from './GlobalContext';

const Root = styled.div`
  padding: 10px;
  background: #d2ffd2;
`;

const Flash = () => {
  const { flash } = useGlobalContext();

  return flash ? <Root>{flash}</Root> : null;
};

export default Flash;
