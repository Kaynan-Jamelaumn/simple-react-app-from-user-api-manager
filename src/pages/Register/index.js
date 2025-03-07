import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  FileInputContainer,
  FileInputLabel,
  FileInputButton,
  FileInputText,
} from '../../styles/GlobalStyles'; // Import global styled components
import { useCustomToast } from '../../utils/customToasts';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 


// Auth
import { register } from '../../services/api';
import { useAuth } from '../../context/AuthContext'; 
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';

export default function Register() {
  const navigate = useNavigate();
  const showToast = useCustomToast();

  //const { login } = useAuth(); // Use the login function from AuthContext
  const dispatch = useDispatch();
  const { isLoading, error: authError } = useSelector((state) => state.auth);

  // State for form data, error messages, and password visibility
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    bio: '',
    confirmPassword: '',
    profilePicture: '',
    username: '',
  });
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the input
    setFormData({ ...formData, [name]: value }); // Update formData state with new values
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate that all fields are filled 
    if (!formData.email || !formData.password || !formData.name || !formData.surname || !formData.bio || !formData.confirmPassword || !formData.username) {
      setError('Please fill in all fields.'); // Set error message
      return;
    }

    // Validate that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      // Call the register function
      const loginData = await register(formData);

      // Use the login function from AuthContext to store the token and user data
    /*  await login({
        email: formData.email,
        password: formData.password,
      });*/
      await dispatch(registerUser(formData)).unwrap(); // Redux

      // If successful, show a success message and redirect
      showToast('success', 'Registration and login successful!');
      navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
      // Handle errors
      showToast('error', error.message || 'An error occurred. Please try again.');
      setError(error.message || 'An error occurred. Please try again.');
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
            Register
            <small>Please fill in the form to create an account.</small>
          </Title>
          <Form onSubmit={handleSubmit}>
            {/* Input fields for registration */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
            {/* Custom file input for profile picture */}
            <FileInputContainer>
              <FileInputText>
                {formData.profilePicture ? formData.profilePicture.name : 'No file chosen'}
              </FileInputText>
              <FileInputLabel htmlFor="profilePicture">
                <FileInputButton>Choose Profile Picture</FileInputButton>
              </FileInputLabel>
              <Input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleInputChange}
                accept="image/*"
                hidden
              />
            </FileInputContainer>
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
            <PasswordInputContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <EyeButton type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </PasswordInputContainer>
            {/* Display error message if any */}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {/* Submit button */}
            <Button type="submit">Register</Button>
          </Form>
        </FormContainer>
    </FormWrapper>
  );
}