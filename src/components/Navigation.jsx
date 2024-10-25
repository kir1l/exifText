import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  margin-bottom: 2rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #b8b8b8;
  font-weight: bold;

  &.active {
    color: #007bff;
  }

  &:hover {
    color: #0056b3;
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/encrypt">Encrypt</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/decrypt">Decrypt</StyledNavLink>
        </li>
      </NavList>
    </Nav>
  );
};

export default Navigation;
