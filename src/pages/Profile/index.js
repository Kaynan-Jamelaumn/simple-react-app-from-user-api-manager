import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles'; 
import { useAuth } from '../../context/AuthContext'; // Custom hook for authentication
import { useCustomToast } from '../../utils/customToasts';

export default function Profile() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const showToast = useCustomToast();
  const { user } = useAuth(); // Access the auth context

  // Print user data to the console
  console.log('User Data:', user);

  return (
    <Container>
      <h1>Profile</h1>
      {user ? (
        <div>
          {Object.entries(user).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </Container>
  );
}