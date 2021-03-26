import { Link } from "@reach/router"
import { useGlobalContext } from './GlobalContext';
import LogoutButton from './LogoutButton';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  list-style-type: none;
  & a, button {
    display: inline-block;
    padding: 8px 16px;
    color: black;
    text-decoration: underline;
  }
`;

const Header = () => {
  const { token } = useGlobalContext();

  return (
    <header>
      <nav>
        {token && (
          <NavList>
            <NavItem>
              <LogoutButton />
            </NavItem>
            <NavItem>
              <Link to="/">Dash</Link>
            </NavItem>
            <NavItem>
              <Link to="/dashboard">Dash2</Link>
            </NavItem>
          </NavList>
        )}
      </nav>
    </header>
  );
}

export default Header;
