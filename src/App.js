  import React, { useContext } from 'react';
  import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Import from styled-components
  import GlobalStyles from './styles/GlobalStyles';
  import Header from './components/Header';
  import AppRoutes from './routes'; 
  import { ThemeContext } from './context/ThemeContext';

  function App() {
    const { theme } = useContext(ThemeContext); // Get the current theme from the custom ThemeContext

    return (
      <StyledThemeProvider theme={theme}> {/* Pass theme to  all styled-components */}
        <React.Fragment>
          <GlobalStyles />
          <Header />
          <AppRoutes />
        </React.Fragment>
      </StyledThemeProvider>
    );
  }

  export default App;