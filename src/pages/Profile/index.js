import React from 'react';
import { useAuth } from '../../context/AuthContext';
const Profile = () => {
  const { user } = useAuth();
  return <div>Profile Page</div>;
};

export default Profile;