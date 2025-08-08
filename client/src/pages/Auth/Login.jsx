import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { validEmail } from "../../helper.js/validation";
import axios from "axios";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigator = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!Email) return setError("Please Enter Your Email.");
    if (!validEmail(Email)) return setError("Please Enter A Valid Email.");
    if (!Password) return setError("Please Enter A Password.");

    axios
      .post("http://localhost:8000/auth/login", { Email, Password })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
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
  return (
    <AuthLayout>
      <div className="grid grid-cols-1 justify-center items-center">
        <form className="border-2 border-blue-600 max-w-90 m-auto px-4 py-6 rounded-2xl">
          <div className="grid justify-center items-center">
            <h2 className="text-2xl text-blue-500 font-bold">Login</h2>
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
              className="mb-2 px-8 py-3 bg-blue-200 rounded-2xl text-lg font-semibold  hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
            >
              Login
            </button>
            <p>
              Already have a Account ?
              <span
                onClick={() => navigator("/register")}
                className="text-blue-400 hove:text-blue-700 hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
