import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState } from "react";

const Container = ({ children }) => {
  const [ShowSidebar, setShowSidebar] = useState(true);
  return (
    <div
      className={`bg-background grid grid-cols-1 transition-all duration-600 ${
        ShowSidebar ? "md:grid-cols-[280px_1fr]" : "grid-cols-1"
      } relative h-full`}
    >
      <div className="side-bar">
        <Sidebar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />
      </div>

      <div className="main-content">
        <Navbar setShowSidebar={setShowSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Container;
