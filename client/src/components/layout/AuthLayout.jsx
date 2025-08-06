import React from "react";
import image from "../../assets/images/login_image.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[60vw_40vw] h-screen">
      <div className="grid justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3.5">
          <Info />
          <div className="flex justify-center items-center max-w-150 m-auto">
            <img className="rounded-6xl" src={image} alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid items-center justify-center mb-4">
          <h2 className="flex justify-center text-3xl text-cyan-700">
            Expense Tracker
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const Info = () => {
  return (
    <div className="flex justify-around items-center w-70 bg-blue-400 rounded-3xl h-20">
      <div
        className="w-13 h-13 flex justify-center items-center bg-blue-700
      rounded-full text-2xl text-white"
      >
        <LuTrendingUpDown />
      </div>
      <p
        className="text-xl font-medium
        text-white"
      >
        Your Profit $1059
      </p>
    </div>
  );
};
