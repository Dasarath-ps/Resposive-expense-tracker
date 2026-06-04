// AuthRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader"; // Reuse the existing loader

// Check if user is logged in or auto-login as guest
const AuthRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isInitializing, setIsInitializing] = useState(!localStorage.getItem("token"));

  useEffect(() => {
    const autoGuestLogin = async () => {
      if (!localStorage.getItem("token")) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const { data } = await axios.post(`${apiUrl}/auth/guest-login`);
          localStorage.setItem("token", data.token);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auto guest login failed", error);
        } finally {
          setIsInitializing(false);
        }
      }
    };

    autoGuestLogin();
  }, []);

  if (isInitializing) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-900">
        <Loader />
        <p className="text-white mt-4">Loading demo data...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return children;
};

export default AuthRoute;
