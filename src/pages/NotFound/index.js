import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundContainer, Message, RedirectButton } from './styled';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Message>404 - Page Not Found</Message>
      <RedirectButton onClick={() => navigate('/')}>
        Redirect to Home Page
      </RedirectButton>
    </NotFoundContainer>
  );
};

export default NotFound;
