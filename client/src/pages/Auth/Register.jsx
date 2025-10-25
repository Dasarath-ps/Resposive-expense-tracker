import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { validEmail } from "../../helper.js/validation.js";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const navigator = useNavigate();
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const handleRegister = (e) => {
    const pr = import.meta.env.VITE_REACT_APP_API_URL;
    e.preventDefault();
    if (!FullName) return setError("Please Enter Your Name");
    if (!Email) return setError("Please Enter Email");
    if (!validEmail(Email)) return setError("Please Enter A Valid Email");
    if (!Password) return setError("Please Enter A Password");
    axios
      .post(`${pr}/auth/register`, {
        FullName,
        Email,
        Password,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "User is already existed") {
          setError("User is already Registered " + "Go to login");
        }
      });
  };
  return (
    <AuthLayout>
      <div className="grid grid-cols-1 justify-center items-center">
        <form className="border-2 border-primary-blue min-w-90 m-auto px-4 py-6 rounded-2xl">
          <div className="grid justify-center items-center">
            <h2 className="text-2xl text-white font-bold ">Register</h2>
          </div>
          <Input
            label={"Full Name"}
            value={FullName}
            placeholder={"John Wick"}
            type={"text"}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label={"Email"}
            value={Email}
            placeholder={"Your@gmail.com"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={"Password"}
            value={Password}
            placeholder={"**********"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="grid justify-center items-center">
            {Error ? <p className="text-xl text-red-500">{Error}</p> : <></>}
            <button
              type="submit"
              onClick={handleRegister}
              className="mb-2 px-8 py-3 bg-primary-blue  rounded-2xl text-lg text-white font-semibold  hover:bg-white hover:text-dark-grey transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
            <p className="text-white">
              Already have a Account ?
              <span
                onClick={() => navigator("/")}
                className="text-primary-blue hove:text-blue-700 hover:underline"
              >
                login
              </span>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
