import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext
import { useNavigation } from './useNavigation'; // Import the custom navigation hook

import { withSpinner} from '../utils/spinnerLoader';


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
    withSpinner.increment(); // start loading component on page


    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    // If a token exists, attach it to the request headers
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    withSpinner.decrementLoading(); // Unload Loading Component
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
authApi.interceptors.response.use(
  (response) => {
    withSpinner.decrementLoading(); // Unload the Loading Component
    // If the response is successful, just return it
    return response;
  },
  async (error) => {
    withSpinner.decrementLoading();
    const originalRequest = error.config;

    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response?.status === 401) {
      // Log the user out
      const { logout } = useAuth();
      logout();

      // Use the navigate function to redirect to the login page
      const navigate = useNavigation();
      navigate('/login', { state: { from: window.location.pathname } }); // Redirect to login with the current path
    }

    // If the error is not related to token expiration, just reject it
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

// Add interceptors to publicApi
publicApi.interceptors.request.use(
  (config) => {
    withSpinner.increment();
    return config;
  },
  (error) => {
    withSpinner.decrementLoading();
    return Promise.reject(error);
  }
);

publicApi.interceptors.response.use(
  (response) => {
    withSpinner.decrementLoading();
    return response;
  },
  (error) => {
    withSpinner.decrementLoading();
    return Promise.reject(error);
  }
);







// Function to handle user login
export const login = async (credentials) => {
  try {
    // Send a POST request to the login endpoint with user credentials
    const response = await publicApi.post('/user/login', credentials);
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
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
    // Remove the token from localStorage
    localStorage.removeItem('token');
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
    const response = await publicApi.post('/user/create', data);

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


export const update = async (data) => {
  try {
    // Send a PUT request to the update endpoint
    const response = await authApi.put('/user/update', data);

    // Check if the response status is within the 200 range (200-299)
    if (response.status >= 200 && response.status < 300) {
      // Return the updated user data
      return response.data;
    }

    // If the status is not in the 200 range, throw an error
    throw new Error(`Update failed with status code: ${response.status}`);
  } catch (error) {
    // Handle both server errors and network errors
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new Error(error.response.data.error || 'Update failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || 'An error occurred during update');
    }
  }
};