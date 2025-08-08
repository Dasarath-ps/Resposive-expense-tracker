import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Sidebar = ({ ShowSidebar, setShowSidebar }) => {
  const handleSidebar = (e) => setShowSidebar((prev) => !prev);
  const menuRef = useRef();

  useEffect(() => {
    const handle = (e) => {
      if (ShowSidebar && !menuRef.current.contains(e.target)) {
        setShowSidebar((prev) => !prev);
        console.log(ShowSidebar);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, [ShowSidebar, setShowSidebar]);

  return (
    <div
      ref={menuRef}
      className={`${
        ShowSidebar ? "translate-x-0" : "-translate-x-[280px] "
      } w-[280px] h-screen bg-amber-300 absolute z-100 transition-all duration-500 ease-in-out `}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full bg-white h-15 w-15 absolute right-0"
      >
        <FaArrowLeft />
      </div>
    </div>
  );
};

export default Sidebar;
