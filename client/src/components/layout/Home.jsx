import React, { useState } from "react";

const Home = () => {
  const [Active, setActive] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(!Active);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className={`header ${
          Active ? "bg-blue-400" : "bg-green-400"
        } max-w-[400px] text-black flex flex-col justify-center items-center p-20 rounded-2xl`}
      >
        <input
          type="text"
          className="bg-white max-w-[200px] border-1 rounded"
        />
        <br />
        <input
          type="text"
          className="bg-white max-w-[200px] rounded border-1 "
        />
        <br />
        <button
          onClick={handleSubmit}
          className="bg-green-400 px-4 py-2 rounded-2xl text-white hover:bg-green-300"
        >
          save
        </button>
      </form>
    </div>
  );
};

export default Home;
