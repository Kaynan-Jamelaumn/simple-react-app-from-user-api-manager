import styled from 'styled-components';

// Wrapper to center the login form
export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // Full viewport height
  padding: 1rem;
  background: ${(props) => props.theme.background};
`;

// Ensure the Container takes full height
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  color: ${(props) => (props.isRed ? 'red' : props.theme.textPrimary)};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 15pt;

  small {
    font-size: 14pt;
    color: ${(props) => props.theme.textInfo};
    display: block;
    margin-top: 0.5rem;
  }
`;

export const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: ${(props) => props.theme.navBackGroundColor};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  font-size: 1rem;
  color: ${(props) => props.theme.inputTextTyped};
  background: ${(props) => props.theme.inputBackground};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  padding-right: 2.5rem; // Add padding to the right to make space for the eye icon

  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    outline: none;
    box-shadow: 0 0 8px ${(props) => props.theme.inputFocus};
  }

  &::placeholder {
    color: ${(props) => props.theme.inputTextTyped};
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.inputTextTyped};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: color 0.4s ease;

  &:hover {
    color: ${(props) => props.theme.inputTextTyped};
    background-color: transparent;
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.buttonTextColor};
  background: ${(props) => props.theme.buttonBackgroundColor};
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.buttonHoverBackgroundColor};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.warning};
  font-size: 0.95rem;
  text-align: center;
  margin: 0.5rem 0;
`;

export const LoginMessage = styled.p`
  color: ${(props) => props.theme.loginMessageColor}; 
  font-size: 0.875rem;
  text-align: center;
  margin: 1rem 0; 
`;