import axios from 'axios';

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
  baseURL: 'https://your-api-url.com', // Base URL for public requests
  headers: {
    'Content-Type': 'application/json', // Set default headers for JSON data
  },
});

// Function to handle user login
export const login = async (credentials) => {
  try {
    // Send a POST request to the login endpoint with user credentials
    const response = await authApi.post('/user/login', credentials);
    // Return the response data (e.g., token and user info)
    return response.data;
  } catch (error) {
    // Throw an error if the request fails
    throw error.response.data;
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
    // Throw an error if the request fails
    throw error.response.data;
  }
};
