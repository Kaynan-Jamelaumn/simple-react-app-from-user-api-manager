  import React, { useContext } from 'react';
  import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Import from styled-components
  import GlobalStyles from './styles/GlobalStyles';
  import Header from './components/Header';
  import AppRoutes from './routes'; 
  import { ThemeContext } from './context/ThemeContext';
  import { ToastContainer } from 'react-toastify'; 
  import { useDispatch } from 'react-redux';
import { initializeAuth } from './store/authSlice';
import LoadingSpinner from './components/LoadingSpinner';
import { useSelector } from 'react-redux';


  function App() {
    const { theme } = useContext(ThemeContext); // Get the current theme from the custom ThemeContext
    const dispatch = useDispatch();
    const loadingCount = useSelector((state) => state.loading.count);


    React.useEffect(() => {
      dispatch(initializeAuth());
    }, [dispatch]);


    return (
      <StyledThemeProvider theme={theme}> {/* Pass theme to  all styled-components */}
      {loadingCount > 0 && <LoadingSpinner />}
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