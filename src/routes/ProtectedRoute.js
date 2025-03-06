import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, pageName }) => {
  const { user, isAuthenticated, isLoading } = useAuth(); // Add isLoading to the destructured values

  // If still loading, show a loading indicator (or nothing)
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: pageName, pageName }} />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;