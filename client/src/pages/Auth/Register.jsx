import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Input";
const Register = () => {
  return (
    <AuthLayout>
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="grid justify-center items-center">
          <h2 className="text-2xl text-blue-500 font-bold mb-8">Register</h2>
        </div>
        <form className="border-2 border-blue-600 max-w-90 m-auto px-4 py-6 rounded-2xl">
          <Input
            label={"Full Name"}
            placeholder={"John Wick"}
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={"Email"}
            placeholder={"Your@gmail.com"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={"Password"}
            placeholder={"**********"}
            type={"password"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="grid justify-center items-center">
            <button className=" px-8 py-3 bg-blue-200 rounded-2xl text-lg font-semibold  hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
