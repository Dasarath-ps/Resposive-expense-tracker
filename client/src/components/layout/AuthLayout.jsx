import React from "react";
import image from "../../assets/images/login_image.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60vw_40vw] min-h-screen w-full bg-background">
      <div className="grid justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3.5">
          <Info />
          <div className="flex justify-center items-center max-w-150 m-auto rounded-3xl overflow-hidden">
            <img className="object-cover" src={image} alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid items-center justify-center ">
          <h2
            className="text-center font-bold text-6xl leading-[3.75rem] mb-6
             bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
             text-transparent bg-clip-text font-itim"
          >
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
    <div className="flex bg-white justify-around items-center w-70 bg-light-grey rounded-3xl h-20">
      <div
        className="w-13 h-13 flex justify-center items-center bg-primary-blue
      rounded-full text-2xl text-white"
      >
        <LuTrendingUpDown />
      </div>
      <p
        className="text-xl font-medium
        text-dark-grey"
      >
        Your Profit $1059
      </p>
    </div>
  );
};
