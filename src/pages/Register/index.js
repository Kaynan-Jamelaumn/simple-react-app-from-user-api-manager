import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import { Container } from '../../styles/GlobalStyles'; 
import { useAuth } from '../../context/AuthContext'; // Custom hook for authentication
import { useCustomToast } from '../../utils/customToasts';

export default function UserRegistration() {
    const navigate = useNavigate();
    const showToast = useCustomToast();

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

    const { login } = useAuth(); // Access the login function from AuthContext

    // Handle input changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Extract name and value from the input
        setFormData({ ...formData, [name]: value }); // Update formData state with new values
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate that all fields are filled 
        if (!formData.email || !formData.password || !formData.name || !formData.surname || !formData.bio || !formData.confirmPassword || !formData.profilePicture || !formData.username) {
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
            // Step 1: Attempt user registration
            await Register(formData); // Assuming userRegistration is a function that handles the registration API call
            showToast('success', 'User created successfully!');

            // Step 2: Only attempt login if registration is successful
            try {
                await login({ email: formData.email, password: formData.password }); // Log in with the registered credentials
                showToast('success', 'Logged in successfully!');
                navigate('/'); // Redirect to the home page or dashboard
            } catch (loginError) {
                // Handle login error (if any)
                showToast('error', loginError.message || 'Login failed. Please try again.');
                setError(loginError.message || 'Login failed. Please try again.');
            }
        } catch (registrationError) {
            // Handle registration error and abort login attempt
            showToast('error', registrationError.message || 'Registration failed. Please try again.');
            setError(registrationError.message || 'Registration failed. Please try again.');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the showPassword state
    };
    return (
        <React.Fragment></React.Fragment>
    )};