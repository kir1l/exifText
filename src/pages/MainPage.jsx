// src/pages/MainPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route, Outlet } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import Navigation from '../components/Navigation';
import EncryptPage from './EncryptPage';
import DecryptPage from './DecryptPage';

const Container = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 2rem;
`;

const MainLayout = ({ image, setImage }) => {
  return (
    <>
      <ImageUploader onImageUpload={setImage} image={image} />
      <Navigation />
      <Outlet context={{ image, setImage }} />
    </>
  );
};

const MainPage = () => {
  const [image, setImage] = useState(null);

  return (
    <Container>
      <Title>EXIF Crypto Tool</Title>
      <Routes>
        <Route
          path="/"
          element={<MainLayout image={image} setImage={setImage} />}
        >
          <Route index element={<EncryptPage />} />
          <Route path="encrypt" element={<EncryptPage />} />
          <Route path="decrypt" element={<DecryptPage />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default MainPage;
