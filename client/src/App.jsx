import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Default Router */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
