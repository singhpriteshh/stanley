/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = '/auth/login' }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;