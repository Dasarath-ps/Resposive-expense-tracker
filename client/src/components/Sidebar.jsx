import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Sidebar = ({ ShowSidebar, setShowSidebar }) => {
  const handleSidebar = (e) => setShowSidebar((prev) => !prev);
  const menuRef = useRef();

  useEffect(() => {
    const handle = (e) => {
      if (ShowSidebar && !menuRef.current.contains(e.target)) {
        setShowSidebar(false);
        //console.log(ShowSidebar);
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
      } bg-background border-r-3 border-primary-blue fixed w-[280px] h-screen  z-[100] transition-all duration-500 ease-in-out `}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full bg-primary-alt h-15 w-15 absolute right-0 hover:text-white transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft />
      </div> */}
      <div className="">
        <SidebarItems path={"/dashboard"} val={"Home"} />
        <SidebarItems path={"/income"} val={"Income"} />
        <SidebarItems path={"/expenses"} val={"Expenses"} />
        <SidebarItems path={"/logout"} val={"Logout"} />
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
            ? "text-accent-orange hover:text-accent-orange"
            : "text-white"
        } `
      }
      to={path}
    >
      <div className="flex justify-center items-center h-[100px] font-semibold text-[20px] rounded-[5px] hover:bg-light hover:text-[22px] transition-all duration-300 ease-in-out border-b-2 border-primary-blue">
        {val}
      </div>
    </NavLink>
  );
};
