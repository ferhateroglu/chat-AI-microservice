import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import {useContext,useNavigate} from 'react';



export const ProtectedRoute = ({ children }) => {

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser.role != "admin") {
    // user is not permisson
    return <Navigate to="/" />;
  }
  return children;
};