// src/components/Header/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/* Styled Components */
const HeaderContainer = styled.header`
  background-color: #242424;
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #b8b8b8;
  font-weight: bold;
  font-size: 1.2rem;

  &.active {
    color: #007bff;
  }

  &:hover {
    color: #0056b3;
  }
`;

/* Header Component */
const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavList>
          <li>
            <StyledNavLink
              to="/encrypt"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Text to Exif
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/image-scramble"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Image Scrambler
            </StyledNavLink>
          </li>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
