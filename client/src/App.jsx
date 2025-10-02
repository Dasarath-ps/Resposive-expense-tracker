import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";

import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import NotFound from "./components/layout/NotFound";
import Home from "./components/layout/Home";
import Demo from "./pages/Demo";
const App = () => {
  const [Content, setContent] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Default Router */}
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
