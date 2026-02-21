import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";  

function ProtectedRoute({ children, role }) {
  const { token, user } = useSelector((s) => s.auth);

  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
