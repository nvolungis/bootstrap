import { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from './GlobalContext';

const Root = styled.div`
  padding: 10px;
  background: #d2ffd2;
`;

const Flash = () => {
  const { flash, setFlash } = useGlobalContext();

  useEffect(() => {
    let timeout;

    if (flash) {
      timeout = setTimeout(() => setFlash(''), 5000);
    }

    return () => clearTimeout(timeout);
  }, [flash, setFlash])

  return flash ? <Root>{flash}</Root> : null;
};

export default Flash;
