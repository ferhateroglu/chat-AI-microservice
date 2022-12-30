import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};