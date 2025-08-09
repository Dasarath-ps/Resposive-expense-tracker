import React from "react";
import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ setShowSidebar }) => {
  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div className="flex h-[50px] items-center justify-between">
      <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full bg-white h-13 w-13 border-2 hover:text-white hover:border-transparent border-blue-400 hover:border-none hover:bg-blue-300 transition-all duration-300"
      >
        <MdMenuOpen />
      </div>
      <div className="flex items-center justify-center w-15 h-15 bg-amber-50 rounded-full text-5xl">
        <FaUserCircle />
      </div>
    </div>
  );
};

export default Navbar;
