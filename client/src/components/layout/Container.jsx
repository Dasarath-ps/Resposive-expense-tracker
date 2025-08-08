import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState } from "react";
const Container = ({ children }) => {
  const [ShowSidebar, setShowSidebar] = useState(true);
  return (
    <div className="grid grid-cols-1 relative">
      <Sidebar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />

      <div className="">
        <Navbar setShowSidebar={setShowSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Container;
