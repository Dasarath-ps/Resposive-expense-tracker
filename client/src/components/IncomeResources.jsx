import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";
import { getUser } from "../helper.js/getUser";

const IncomeResources = ({ Data, setData }) => {
  //console.log(Data);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const incomeElements = document.querySelectorAll(".income");
    incomeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // cleanup
  }, []);
  // if (!Array.isArray(Data) || Data.length === 0) {
  //   return null;
  // }
  return (
    <div className="relative transition-all duration-500 ease-in-out m-4  p-4 border-2 border-white rounded-md hover:bg-white/10 bg-white/5 shadow-md shadow-white/70 hover:shadow-none overflow-hidden">
      <h2 className="font-itim">Income Resources</h2>
      <button className="absolute top-3 right-3 bg-primary-blue p-1 rounded-md ">
        download
      </button>
      <div className=" income grid grid-cols-1 md:grid-cols-2 md:gap-7 w-full h-100vh mt-4 p-2">
        {Data && Data.length > 0 ? (
          Data.map((element, index) => (
            <SourceData
              key={index}
              element={element}
              Data={Data}
              setData={setData}
              index={index}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default IncomeResources;

const SourceData = ({ element, Data, setData, index }) => {
  let date = new Date(element.date).toLocaleDateString();
  const [highlight, setHighlight] = useState(false);
  const deleteSource = async (element) => {
    try {
      const userId = await getUser();
      //console.log(userId);
      const res = await axios.post("http://localhost:8000/income/delete", {
        element,
        userId,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    const filterData = Data.filter((_, i) => i !== index);
    setData(filterData);
  };
  return (
    <div
      className="flex justify-between items-center hover:bg-dark-grey transition-all duration-300 ease-in-out rounded-lg p-2 "
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    >
      {/* Left side */}
      <div className="grid grid-cols-1 gap-1.5">
        <h3>{element.source}</h3>
        <div>{date}</div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <div
          className={`w-10 h-10 rounded-full bg-white flex justify-center items-center 
              transition-opacity duration-300 ease-in-out 
              ${highlight ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={() => deleteSource(element)}
            className="p-2 text-red-500 rounded-md"
          >
            <FaRegTrashAlt />
          </button>
        </div>

        <div className="p-1 bg-green-500 rounded-lg w-17 flex justify-around items-center">
          <IoTrendingUpOutline />
          {element.amount}
        </div>
      </div>
    </div>
  );
};
