import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <MainPage />
      </AppContainer>
    </Router>
  );
};

export default App;
