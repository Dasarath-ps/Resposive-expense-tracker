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
