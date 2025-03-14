import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, pageName }) => {
  //const { user, isAuthenticated, isLoading } = useAuth(); 
  const { isAuthenticated } = useSelector((state) => state.auth);


  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: pageName, pageName }} />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;