  import React, { useContext } from 'react';
  import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Import from styled-components
  import GlobalStyles from './styles/GlobalStyles';
  import Header from './components/Header';
  import AppRoutes from './routes'; 
  import { ThemeContext } from './context/ThemeContext';
  import { ToastContainer } from 'react-toastify'; 
  import { useDispatch } from 'react-redux';
import { initializeAuth } from './store/authSlice';


  function App() {
    const { theme } = useContext(ThemeContext); // Get the current theme from the custom ThemeContext
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(initializeAuth());
    }, [dispatch]);


    return (
      <StyledThemeProvider theme={theme}> {/* Pass theme to  all styled-components */}
        <React.Fragment>
          <GlobalStyles />
          <Header />
          <AppRoutes />
          <ToastContainer   position="top-right"
          autoClose={5000} // Close after 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        </React.Fragment>
      </StyledThemeProvider>
    );
  }

  export default App;