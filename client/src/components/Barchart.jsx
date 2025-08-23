import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
const Barchart = ({ Data }) => {
  return (
    <div className=" h-[550px] md:h-screen border-2 border-white m-4 mb-4 rounded">
      <ResponsiveContainer>
        <BarChart data={Data}>
          {/* <CartesianGrid stroke={"#ccc"} strokeDasharray={"1 3"} /> */}
          <XAxis dataKey={"source"} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey={"amount"}
            radius={[10, 10, 0, 0]}
            activeBar={{
              fill: "#0056b3",
              stroke: "#003f88", // optional border on hover
              strokeWidth: 2,
            }}
          >
            {Data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? "#007bff" : "#5a86ad"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
