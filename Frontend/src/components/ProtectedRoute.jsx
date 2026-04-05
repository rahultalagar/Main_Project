import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== allowedRole) {
      return <Navigate to="/" />;
    }

    return children;

  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;