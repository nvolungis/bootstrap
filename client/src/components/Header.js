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
  & a, button, span {
    display: inline-block;
    padding: 10px;
    color: black;
    text-decoration: underline;
  }
  & span {
    text-decoration: none;
  }
`;

const Header = () => {
  const { token, email } = useGlobalContext();

  return (
    <header>
      <nav>
        {token ? (
          <NavList>
            <NavItem>
              <span>{email}</span>
            </NavItem>
            <NavItem>
              <LogoutButton />
            </NavItem>
            <NavItem>
              <Link to="/">Dash</Link>
            </NavItem>
          </NavList>
        ): (
          <NavList>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/signup">Sign Up</Link>
            </NavItem>
          </NavList>
        )}
      </nav>
    </header>
  );
}

export default Header;
