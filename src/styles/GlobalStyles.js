import { createGlobalStyle, styled } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body {
        font-family: sans-serif;
        background-color: ${(props) => props.theme.bodyBackgroundColor};
    }
    html, body, #root {
        height: 100%;
    }
    button {
        cursor: pointer;
        background: ${(props) => props.theme.buttonBackgroundColor};
        border: none;
        color: ${(props) => props.theme.buttonTextColor};
        padding: 10px 20px;
        &:hover {
            background: ${(props) => props.theme.buttonHoverBackgroundColor};
        }
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    ul {
        list-style: none;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    .text-center {
        text-align: center;
    }
    .text-right {
        text-align: right;
    }
    .text-left {
        text-align: left;
    }

    /* Tag Styles */
    .tag {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .tag-primary {
        background-color: ${(props) => props.theme.tagPrimary};
        color: white;
    }
    .tag-secondary {
        background-color: ${(props) => props.theme.tagSecondary};
        color: white;
    }
    .tag-tertiary {
        background-color: ${(props) => props.theme.tagTertiary};
        color: white;
    }
    .tag-success {
        background-color: ${(props) => props.theme.success};
        color: white;
    }
    .tag-warning {
        background-color: ${(props) => props.theme.warning};
        color: black;
    }
    .tag-error {
        background-color: ${(props) => props.theme.error};
        color: white;
    }
    .tag-info {
        background-color: ${(props) => props.theme.info};
        color: white;
    }
`;

export const Container = styled.section`
    max-width: auto;
`;


// Wrapper to center the form
export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // Full viewport height
  padding: 1rem;
  background: ${(props) => props.theme.background};
`;


export const Title = styled.h1`
  color: ${(props) => props.theme.textPrimary};
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormLabel = styled.label`
  color: ${(props) => props.theme.textPrimary}; // Use the theme color
  font-size: 14pt; // Make it a little bigger
  margin-bottom: 8px; // Add a small bottom margin
  display: block; // Ensure it takes up the full width
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
  padding-right: 2.5rem;

  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    outline: none;
    box-shadow: 0 0 8px ${(props) => props.theme.inputFocus};
  }

  &::placeholder {
    color: ${(props) => props.theme.inputTextTyped};
  }

  &:disabled {
    background: ${(props) => props.theme.inputDisabledBackground} !important;
    color: ${(props) => props.theme.inputDisabledTextColor};
    cursor: not-allowed;
  }

  &:disabled:hover {
    cursor: not-allowed;
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

export const FormMessage = styled.p`
  color: ${(props) => props.theme.loginMessageColor}; 
  font-size: 0.875rem;
  text-align: center;
  margin: 1rem 0; 
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.inputBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 0.75rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus-within {
    border-color: ${(props) => props.theme.inputFocus};
    box-shadow: 0 0 8px ${(props) => props.theme.inputFocus};
  }
`;

export const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: 100%;
`;

export const FileInputButton = styled.span`
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme.buttonBackgroundColor};
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.buttonHoverBackgroundColor};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FileInputText = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.inputTextTyped};
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0.5rem;
`;