import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Input = ({ label, value, type, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  //console.log(showPassword);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <label className="text-blue-800 text-lg font-semibold">{label}</label>
      <div className="flex items-center border-2 rounded-2xl border-blue-400 mb-4">
        <input
          className="h-10 outline-none ps-1 w-[90%]"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <button className="text-2xl text-blue-500" onClick={togglePassword}>
          {type === "password" ? (
            showPassword ? (
              <LuEye />
            ) : (
              <LuEyeClosed />
            )
          ) : null}
        </button>
      </div>
    </>
  );
};

export default Input;
