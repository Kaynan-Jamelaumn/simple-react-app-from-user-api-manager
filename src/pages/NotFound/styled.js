import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
`;

export const Message = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.textDark};
  margin-bottom: 1rem;
`;

export const RedirectButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
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
