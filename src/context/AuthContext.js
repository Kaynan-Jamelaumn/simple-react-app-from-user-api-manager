import { createContext, useState, useContext, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, fetchUserData } from "../services/api";

// Create an authentication context
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [user, setUser] = useState(null); // Store user data

  // Check for a token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Set authenticated to true if a token exists;
    }
  }, []);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const { token, user } = await apiLogin(credentials); // Call the login API
      localStorage.setItem('token', token); // Store the token in localStorage
      setIsAuthenticated(true); // Set authenticated to true
      setUser(user); // Set user data
    } catch (error) {
      throw error; // Propagate the error
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await apiLogout(); // Call the logout API
      localStorage.removeItem('token'); // Remove the token from localStorage
      setIsAuthenticated(false); // Set authenticated to false
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