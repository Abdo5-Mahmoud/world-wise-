import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Stores/AuthContext.jsx";
import PropTypes from "prop-types";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);
  return <>{isAuthenticated ? children : null}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
