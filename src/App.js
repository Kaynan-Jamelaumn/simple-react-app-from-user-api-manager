import React, { useContext } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import AppRoutes from './routes'; 
import { ThemeContext } from './config/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext); // Get theme from context

  return (
    <React.Fragment>
      <GlobalStyles theme={theme} /> {/* Ensure GlobalStyles receives theme */}
      <Header />
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;
