import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import NotFound from "./components/layout/NotFound";
import Home from "./components/layout/Home";
import Demo from "./pages/Demo";
import AuthRoute from "./components/AuthRouter"; // import the protected route

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Demo />
          </AuthRoute>
        }
      />
      <Route
        path="/income"
        element={
          <AuthRoute>
            <Income />
          </AuthRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <AuthRoute>
            <Expenses />
          </AuthRoute>
        }
      />
      <Route
        path="/home"
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />

      {/* Catch all */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
