// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import API functions for authentication
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/api';

// Define the initial state for the authentication slice
const initialState = {
  isAuthenticated: false, // Tracks if the user is logged in
  user: null, // Stores the user's data
  token: null, // Stores the authentication token
  isLoading: true, // Tracks if the authentication state is being initialized
  error: null, // Stores any error messages
};

/**
 * Async thunk to initialize authentication state.
 * Checks localStorage for a token and user data on app load.
 */
export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  const userData = localStorage.getItem('user'); // Get user data from localStorage
  return { token, user: userData ? JSON.parse(userData) : null }; // Return the data
});

/**
 * Async thunk to handle user login.
 * Calls the login API, stores the token and user data in localStorage, and updates the state.
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await apiLogin(credentials); // Call the login API
      localStorage.setItem('token', data.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
      return data; // Return the API response
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

/**
 * Async thunk to handle user logout.
 * Calls the logout API, removes the token and user data from localStorage, and updates the state.
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiLogout(); // Call the logout API
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('user'); // Remove user data from localStorage
      return null; // Return a resolved value
    } catch (error) {
      console.error('Logout API error:', error);
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

/**
 * Async thunk to handle user registration.
 * Calls the register API, stores the token and user data in localStorage, and updates the state.
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await apiRegister(userData); // Call the register API
      localStorage.setItem('token', data.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
      return data; // Return the API response
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

/**
 * Create the authentication slice using createSlice.
 * Defines the initial state, reducers, and extra reducers for handling async thunks.
 */
const authSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer to update user data in the state
    updateUser: (state, action) => {
      state.user = action.payload; // Update user data
      localStorage.setItem('user', JSON.stringify(action.payload)); // Update localStorage
    },
    // Reducer to clear any error messages
    clearError: (state) => {
      state.error = null; // Clear the error
    },
  },
  // Extra reducers to handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Handle successful initialization
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload.token && action.payload.user) {
          state.isAuthenticated = true; // Set authenticated to true
          state.user = action.payload.user; // Set user data
          state.token = action.payload.token; // Set token
        }
        state.isLoading = false; // Mark initialization as complete
      })
      // Handle login pending state
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Set loading to true
      })
      // Handle successful login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authenticated to true
        state.user = action.payload.user; // Set user data
        state.token = action.payload.token; // Set token
        state.error = null; // Clear any errors
        state.isLoading = false; // Set loading to false
      })
      // Handle login failure
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
        state.isLoading = false; // Set loading to false
      })
      // Handle logout failure
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
        state.isLoading = false; // Set loading to false
      })
      // Handle successful logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false; // Set authenticated to false
        state.user = null; // Clear user data
        state.token = null; // Clear token
        state.error = null; // Clear any errors
        state.isLoading = false; // Set loading to false
      })
      // Handle registration pending state
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Set loading to true
      })
      // Handle successful registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authenticated to true
        state.user = action.payload.user; // Set user data
        state.token = action.payload.token; // Set token
        state.error = null; // Clear any errors
        state.isLoading = false; // Set loading to false
      })
      // Handle registration failure
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
        state.isLoading = false; // Set loading to false
      });
  },
});

// Export the actions for use in components
export const { updateUser, clearError } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;