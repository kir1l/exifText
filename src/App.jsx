import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
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
