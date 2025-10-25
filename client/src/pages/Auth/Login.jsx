import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "../../helper.js/validation";
import axios from "axios";
import { FaRegHandPointUp } from "react-icons/fa";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const pr = import.meta.env.REACT_APP_API_URL;
  console.log(pr);
  const navigator = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!Email) return setError("Please Enter Your Email.");
    if (!validEmail(Email)) return setError("Please Enter A Valid Email.");
    if (!Password) return setError("Please Enter A Password.");

    axios
      .post(`${pr}/auth/login`, { Email, Password })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigator("/dashboard");
      })
      .catch((err) => {
        console.log(("Error", err));
        if (err.response.data.message === "User is not Registered") {
          setError(err.response.data.message);
        }
        if (err.response.data.message === "Incorect Password") {
          setError(err.response.data.message);
        }
      });
  };
  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${pr}/auth/guest-login`);
      console.log(data);

      localStorage.setItem("token", data.data.token);
      navigator("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AuthLayout>
      <div className="grid grid-cols-1 justify-center items-center">
        <form className="border-2 border-primary-blue min-w-70 m-4 px-4 py-6 rounded-2xl">
          <div className="grid justify-center items-center ">
            <h2 className="text-2xl font-bold text-white ">Login</h2>
          </div>
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
            {Error ? <p className="text-sm text-red-500">{Error}</p> : null}
            <button
              type="submit"
              onClick={handleLogin}
              className="mb-2 px-8 py-3 bg-primary-blue rounded-2xl text-lg font-semibold  hover:bg-white text-white hover:text-dark-grey transition-all duration-300 ease-in-out"
            >
              Login
            </button>
            <p className="text-white">
              Create new Account
              <Link to={"/register"}>
                <span className="text-primary-blue hover:underline">
                  Sign Up
                </span>
              </Link>
              <div className="mt-6 flex flex-col items-center justify-center">
                <button
                  onClick={handleGuestLogin}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-200"
                >
                  Continue as Guest
                </button>

                {/* Animated pointing icon */}
                <FaRegHandPointUp className="mt-3 text-primary-blue text-3xl animate-bounce" />
              </div>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
