import { Navigate, Outlet } from "react-router-dom";
import isTokenValid from "./isTokenValid";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem("authToken"); // Remove invalid token
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
