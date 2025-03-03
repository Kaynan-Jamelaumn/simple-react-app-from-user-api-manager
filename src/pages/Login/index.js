import React from 'react';
import { useLocation } from 'react-router-dom';
import { Title } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Login() {
  const location = useLocation();
  const { from, pageName } = location.state || {};

  return (
    <React.Fragment>
      <Container>
        <Title isRed={false}>
          <h1>Login</h1>
          <small>
            é pequeno
          </small>
        </Title>
        {from && (
          <p>
            You must be logged in to {pageName ? `access ${pageName}` : `access ${from}`}.
          </p>
        )}
      </Container>
    </React.Fragment>
  );
}