import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FormWrapper,
  Container,
  Title,
  FormContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
  FormMessage,
  PasswordInputContainer,
  EyeButton,
} from '../../styles/GlobalStyles'; // Import global styled components
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useCustomToast } from '../../utils/customToasts';

// Auth
import { useAuth } from '../../context/AuthContext'; // Custom hook for authentication
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice'; // redux

export default function Login() {
  const location = useLocation(); // Access the current location object
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { from, pageName } = location.state || {}; // Retrieve state from location (e.g., redirect path)
  const showToast = useCustomToast();

  const dispatch = useDispatch();
  const { isLoading, error: authError } = useSelector((state) => state.auth);

  // State for form data, error messages, and password visibility
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  //onst { login } = useAuth(); // Access the login function from AuthContext

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the input
    setFormData({ ...formData, [name]: value }); // Update formData state with new values
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate that both email and password are filled
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.'); // Set error message
      return;
    }
    setError(''); // Clear any previous errors

    try {
      //await login(formData); // Call the login function with form data
      await dispatch(loginUser(formData)).unwrap(); // redux 
      showToast('success', 'Logged in successfully!');
      navigate(from || '/'); // Redirect to the dashboard or the previous page
    } catch (error) {
      // Display an error message if login fails
      showToast('error', error.message || 'Login failed. Please try again.');
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };

  return (
    <FormWrapper>
      <FormContainer>
        <Title>
          Login
          <small>Welcome back! Please log in to continue.</small>
        </Title>
        {/* Display a message if the user was redirected to login */}
        {from && (
          <FormMessage>
            You must be logged in to {pageName ? `access ${pageName}` : `access ${from}`}.
          </FormMessage>
        )}
        {/* Login form */}
        <Form onSubmit={handleSubmit}>
          {/* Email input field */}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {/* Password input field with visibility toggle */}
          <PasswordInputContainer>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <EyeButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeButton>
          </PasswordInputContainer>
          {/* Display error message if any */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {/* Submit button */}
          <Button type="submit">Log In</Button>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
}