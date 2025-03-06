import axios from 'axios';
import { data } from 'react-router-dom';

// Create an authenticated axios instance for requests that require a token
const authApi = axios.create({
  baseURL: 'http://localhost:8765', // Base URL for authenticated requests
  headers: {
    'Content-Type': 'application/json', // Set default headers for JSON data
  },
});

// Add a request interceptor to the authenticated instance
authApi.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    // If a token exists, attach it to the request headers
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Create a non-authenticated axios instance for public requests
const publicApi = axios.create({
  baseURL: 'http://localhost:8765', // Base URL for public requests
  headers: {
    'Content-Type': 'application/json', // Set default headers for JSON data
  },
});

// Function to handle user login
export const login = async (credentials) => {
  try {
    // Send a POST request to the login endpoint with user credentials
    const response = await publicApi.post('/user/login', credentials);
    // Return the response data (e.g., token and user info)
    return response.data;
  } catch (error) {
    // Handle both server errors and network errors
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new Error(error.response.data.message || 'Login failed'); // Throw an Error object
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server'); // Throw an Error object
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || 'An error occurred during login'); // Throw an Error object
    }
  }
};

// Function to handle user logout
export const logout = async () => {
  try {
    // Send a GET request to the logout endpoint
    const response = await authApi.get('/user/logout');


    // Return the response data

    return response.data;
  } catch (error) {
    // Handle both server errors and network errors
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new Error(error.response.data.message || 'Logout failed'); // Throw an Error object
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server'); // Throw an Error object
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || 'An error occurred during logout'); // Throw an Error object
    }
  }
};

export const register = async (data) => {
  try {
    // Send a POST request to the register endpoint
    const response = await authApi.post('/user/create', data);

    // Check if the response status is within the 200 range (200-299)
    if (response.status >= 200 && response.status < 300) {
      // Automatically log in the user after successful registration
      const loginResponse = await publicApi.post('/user/login', {
        email: data.email,
        password: data.password,
      });

      // Return the login response (token and user data)
      return loginResponse.data;
    }

    // If the status is not in the 200 range, throw an error
    throw new Error(`Registration failed with status code: ${response.status}`);
  } catch (error) {
    // Handle both server errors and network errors
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new Error(error.response.data.error || 'Registration failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || 'An error occurred during registration');
    }
  }
};