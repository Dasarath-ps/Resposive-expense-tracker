import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";
import { getUser } from "../helper.js/getUser";
import { useNavigate } from "react-router-dom";
import { downloadExcel } from "../helper.js/download";
//import { API_URL } from "../config.js";

const IncomeResources = ({ Data, setData, pageType, header, buttonText }) => {
  // console.log(pageType);
  // console.log(header);

  console.log(Data);
  const navigate = useNavigate();
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
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto transition-all duration-500 ease-in-out m-6 p-6 border-2 border-white rounded-xl hover:bg-white/10 bg-white/5 shadow-md shadow-white/60 hover:shadow-none overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-itim text-white text-2xl">{header}</h2>
        <button
          className="bg-primary-blue hover:bg-blue-700 px-3 py-1 rounded-md text-white  font-semibold transition font-itim text-lg"
          onClick={() => {
            if (buttonText === "Download") {
              downloadExcel(Data, "UserData.xlsx");
            } else if (buttonText === "See all") {
              if (header === "Expense") {
                navigate("/expenses");
              }
              if (header === "Income") {
                navigate("/income");
              }
            }
          }}
        >
          {buttonText ? buttonText : ""}
        </button>
      </div>

      <div
        className={`income grid ${
          pageType === "dashboard"
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 gap-5"
        } w-full h-[60vh] p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
      >
        {Array.isArray(Data) && Data.length > 0 ? (
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
          <div className="text-gray-400 text-center col-span-full py-10">
            No income data found.
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeResources;

const SourceData = ({ element, Data, setData, index }) => {
  const [highlight, setHighlight] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const date = element.date
    ? new Date(element.date).toLocaleDateString()
    : null;

  const deleteSource = async (element) => {
    try {
      const userId = await getUser();
      if (!userId) {
        console.error("No user ID available");
        return;
      }
      const res = await axios.post(`${apiUrl}/income/delete`, {
        element,
        userId,
      });
      console.log(res.data);
      const filteredData = Data.filter((_, i) => i !== index);
      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex justify-between items-center hover:bg-white/30 shadow shadow-white hover:shadow-none transition-all duration-400 ease-in-out rounded-lg py-4 px-3 bg-white/10 mb-3"
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    >
      <div className="grid gap-1 text-white">
        <h3 className="text-lg font-semibold">{element.source}</h3>
        {date && <div className="text-sm opacity-80">{date}</div>}
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full bg-white flex justify-center items-center transition-all duration-300 ease-in-out ${
            highlight ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <button
            onClick={() => deleteSource(element)}
            className="text-red-500 text-lg"
          >
            <FaRegTrashAlt />
          </button>
        </div>

        <div
          className={`px-3 py-1 ${
            element.type === "expense" ? "bg-red-500" : "bg-green-500"
          } rounded-lg min-w-[90px] flex justify-between items-center text-white font-medium`}
        >
          <IoTrendingUpOutline />
          <span>{element.amount}</span>
        </div>
      </div>
    </div>
  );
};
