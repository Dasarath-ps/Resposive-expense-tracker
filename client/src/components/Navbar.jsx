import React from "react";
import { MdMenuOpen } from "react-icons/md";

const Navbar = ({ setShowSidebar }) => {
  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div className="flex h-[50px]">
      <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full bg-white h-15 w-15 border-2 border-black"
      >
        <MdMenuOpen />
      </div>
    </div>
  );
};

export default Navbar;
