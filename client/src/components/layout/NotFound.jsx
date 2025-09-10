import React from "react";
import image from "../../assets/images/404.png";
const NotFound = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center  ">
      <h3 className="text-white text-2xl">Not Available</h3>
      <img className="max-w-60 max-h-60" src={image} alt="" />
    </div>
  );
};

export default NotFound;
