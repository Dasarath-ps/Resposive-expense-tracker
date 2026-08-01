import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ setShowSidebar }) => {
  const [showPopUp, setShowPopUp] = React.useState(false);
  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div className="sticky top-0 flex h-[70px] md:w-[calc(100% - 280px)] items-center justify-between border-b-2 border-white bg-black z-200 rounded-b-lg">
      <div
        onClick={handleSidebar}
        className="flex justify-center items-center text-3xl rounded-full h-13 w-13 border-2 text-dark-grey bg-white hover:border-transparent border-white hover:border-none hover:bg-primary-blue hover:text-white transition-all duration-300 ml-2"
      >
        <MdMenuOpen />
      </div>
      <button className="flex items-center justify-center w-15 h-15 rounded-full text-5xl text-white"
        onClick={() => setShowPopUp(!showPopUp)}
      >
        <FaUserCircle />
      </button>
      {showPopUp && <PopUp setShowPopUp={setShowPopUp} />}
    </div>
  );
};

export default Navbar;

const PopUp = ({ setShowPopUp }) => {
  const navigator = useNavigate();
  return (
    <div className="absolute top-16 right-2 bg-white rounded-lg shadow-lg p-4 z-50">


      <ul>
        <li className="mb-1">
          <button href="/profile" className="text-blue-500 hover:bg-blue-100 hover:text-2xl transition-all duration-300 hover:rounded-md"
            onClick={() => navigator("/login")}
          >
            Sign In
          </button>
        </li>
        <li className="mb-1">
          <button href="/settings" className="text-blue-500 hover:bg-blue-100 hover:text-2xl transition-all duration-300 hover:rounded-md"
            onClick={() => navigator("/register")}
          >
            Sign Up
          </button>
        </li>
      </ul>
    </div>
  );
};
