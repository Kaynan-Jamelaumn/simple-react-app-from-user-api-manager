import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Title,
  LoginForm,
  Input,
  Button,
  FormContainer,
  ErrorMessage,
  LoginWrapper,
  LoginMessage,
  PasswordInputContainer,
  EyeButton,
} from './styled';
import { Container } from '../../styles/GlobalStyles';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export default function Login() {
  const location = useLocation();
  const { from, pageName } = location.state || {};

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('Logging in with:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginWrapper>
      <Container>
        <FormContainer>
          <Title>
            Login
            <small>Welcome back! Please log in to continue.</small>
          </Title>
          {from && (
            <LoginMessage>
              You must be logged in to {pageName ? `access ${pageName}` : `access ${from}`}.
            </LoginMessage>
          )}
          <LoginForm onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Log In</Button>
          </LoginForm>
        </FormContainer>
      </Container>
    </LoginWrapper>
  );
}