import React from "react";
import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ setShowSidebar }) => {
  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div className="sticky top-0 flex h-[70px] items-center justify-between border-b-2 border-dark-grey bg-background z-200">
      <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full h-13 w-13 border-2 text-dark-grey bg-white hover:border-transparent border-white hover:border-none hover:bg-primary-blue hover:text-white transition-all duration-300 ml-2"
      >
        <MdMenuOpen />
      </div>
      <div className="flex items-center justify-center w-15 h-15 rounded-full text-5xl text-white">
        <FaUserCircle />
      </div>
    </div>
  );
};

export default Navbar;
