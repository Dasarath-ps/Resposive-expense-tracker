import { isAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = ({ ShowSidebar, setShowSidebar }) => {
  const handleSidebar = (e) => setShowSidebar((prev) => !prev);
  const menuRef = useRef();
  const navigator = useNavigate();
  useEffect(() => {
    const handle = (e) => {
      if (window.innerWidth < 768) {
        if (ShowSidebar && !menuRef.current.contains(e.target)) {
          setShowSidebar(false);
          //console.log(ShowSidebar);
        }
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, [ShowSidebar, setShowSidebar]);
  const clear = (e) => {
    //e.preventDefault();
    localStorage.clear();
    navigator("/");
  };
  return (
    <div
      ref={menuRef}
      className={`${
        ShowSidebar ? "translate-x-0" : "-translate-x-[280px] "
      } bg-gray-800 border-2 border-r-white rounded-b-2xl fixed w-[280px] h-screen  z-[300] transition-all duration-500 ease-in-out `}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full bg-primary-alt h-15 w-15 absolute right-0 hover:text-white transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft />
      </div> */}
      <div className="flex flex-col justify-center h-screen items-center">
        <SidebarItems path={"/dashboard"} val={"Home"} />
        <SidebarItems path={"/income"} val={"Income"} />
        <SidebarItems path={"/expenses"} val={"Expenses"} />
        <div
          className="flex justify-center items-center h-20 max-w-60 min-w-50 font-semibold text-[20px]  hover:text-[22px] transition-all duration-300 ease-in-out text-white border-2 border-white m-2 rounded-[10px]"
          onClick={clear}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarItems = ({ path, val }) => {
  return (
    <NavLink
      //className={`${isActive ? "text-blue-600" : ""}`}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-black/90 bg-white/70 border-3 border-white m-2 rounded-[10px] font-semibold"
            : "text-white border-2 border-white m-2 rounded-[10px]"
        } `
      }
      to={path}
    >
      <div
        className={`flex justify-center items-center h-20 max-w-60 min-w-50 font-semibold text-[20px] rounded-[5px] hover:text-[22px] transition-all duration-300 ease-in-out`}
      >
        {val}
      </div>
    </NavLink>
  );
};
