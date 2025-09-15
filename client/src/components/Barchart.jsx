import React from "react";
import image from "../assets/images/404.png";
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
import { ButtonForAdd } from "../pages/Income";

const Barchart = ({ Data, setshowForm }) => {
  if (!Array.isArray(Data) || Data.length == 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center overflow-hidden bg-background ">
        <h3 className="text-white text-2xl">No Data Available</h3>
        <img className="max-w-60 max-h-60" src={image} alt="" />
        <ButtonForAdd setshowForm={setshowForm} />
      </div>
    );
  }
  return (
    <div className="max-w-[1200px] h-[600px] w-[70vw] border-2 border-white m-auto mb-4 rounded-[15px] mt-4 shadow-[3px_3px_10px_white] hover:shadow-none transition-all duration-500 overflow-hidden  ease-in-out shadow-white hover:bg-white/7 bg-white/5">
      <span className="shadow"></span>
      <ResponsiveContainer>
        <BarChart data={Array.isArray(Data) ? Data : []}>
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
            {(Array.isArray(Data) ? Data : []).map((entry, index) => (
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
