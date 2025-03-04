import { createContext, useState, useContext, useEffect } from "react";
import { login as apiLogin, logout as apiLogout } from "../services/api";

// Create an authentication context
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [user, setUser] = useState(null); // Store user data

  // Check for a token and user data in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true); // Set authenticated to true if a token exists
      setUser(JSON.parse(userData)); // Set user data from localStorage
    }
  }, []);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const { token, user } = await apiLogin(credentials); // Call the login API
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
      setIsAuthenticated(true); // Set authenticated to true
      setUser(user); // Set user data in state
      console.log('User logged in:', user);
    } catch (error) {
      throw error; // Propagate the error
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await apiLogout(); // Call the logout API
      localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user'); // Remove user data from localStorage
      setIsAuthenticated(false); // Set authenticated to false
      setUser(null); // Clear user data from state
    } catch (error) {
      throw error; // Propagate the error
    }
  };

  // Provide authentication state and functions to child components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);