// src/pages/TextToExif/TextToExif.jsx

import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`

`;

const SubNav = styled.nav`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SubNavLink = styled(NavLink)`
  text-decoration: none;
  color: #b8b8b8;
  font-weight: bold;
  font-size: 1.1rem;

  &.active {
    color: #007bff;
  }

  &:hover {
    color: #0056b3;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #fff;
  margin-bottom: 2rem;
  font-size: 30px;
`

/* TextToExif Component */
const TextToExif = () => {
  // Define state to hold the image and setter function
  const [image, setImage] = useState(null);

  return (
    <Container>
      <Title>Text to image EXIF tool</Title>
      {/* Sub-navigation for Encrypt and Decrypt */}
      <SubNav>
        <SubNavLink
          to="/encrypt"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          Encrypt
        </SubNavLink>
        <SubNavLink
          to="/decrypt"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          Decrypt
        </SubNavLink>
      </SubNav>
      
      {/* Provide context to Outlet */}
      <Outlet context={{ image, setImage }} />
    </Container>
  );
};

export default TextToExif;
