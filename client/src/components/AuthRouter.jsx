// AuthRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// Check if user is logged in
const AuthRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token"); // or your auth check

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
};

export default AuthRoute;
