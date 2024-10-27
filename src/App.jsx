// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header/Header';

// Import pages
import TextToExif from './pages/TextToExif/TextToExif';
import Encrypt from './pages/TextToExif/nested/EncryptPage';
import Decrypt from './pages/TextToExif/nested/DecryptPage';
import ImageScramble from './pages/ImageScramble/ImageScramble';

// Styled component for consistent layout
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  return (
    <Router>
      <Header />
      <AppContainer>
        <Routes>
          {/* TextToExif routes */}
          <Route path="/" element={<TextToExif />}>
            {/* Nested routes within TextToExif */}
            <Route index element={<Encrypt />} />
            <Route path="encrypt" element={<Encrypt />} />
            <Route path="decrypt" element={<Decrypt />} />
          </Route>

          {/* ImageScramble route */}
          <Route path="image-scramble" element={<ImageScramble />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;