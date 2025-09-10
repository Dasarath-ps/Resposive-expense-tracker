import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import image from "../assets/images/404.png";
const LineBar = ({ Data }) => {
  ///console.log(Data);
  if (Data.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center  ">
        <h3 className="text-white text-2xl">No Data Available</h3>
        <img className="max-w-60 max-h-60" src={image} alt="" />
        <button
          onClick={() => setShowForm(true)}
          className="px-2 py-2 bg-primary-blue text-white text-md rounded-lg absolute
        top-3 right-3"
        >
          + Expense
        </button>
      </div>
    );
  }
  return Data ? (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={Data}>
          {/* <CartesianGrid strokeDasharray="1 1" /> */}
          <XAxis
            dataKey="date"
            tickFormatter={(str) => new Date(str).toLocaleDateString("en-GB")}
            //label={{ value: "Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name="Expense date"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <></>
  );
};

export default LineBar;
