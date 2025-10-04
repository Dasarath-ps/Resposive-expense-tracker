import React from "react";
import image from "../assets/images/404.png";
import Chart from "react-apexcharts";
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
  const options = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
        easing: "easeinout",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        columnWidth: "40%",
        distributed: true, // makes each bar different color
      },
    },
    colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#008FFB"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: Data.map((item) => item.source),
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    grid: {
      borderColor: "rgba(255,255,255,0.1)",
    },
  };

  const series = [
    {
      name: "Amount",
      data: Data.map((item) => item.amount),
    },
  ];
  return (
    <div className="max-w-[1200px] h-[600px] w-[70vw] m-auto mt-6 p-4 rounded-[15px] shadow-[3px_3px_15px_rgba(0,0,0,0.6)] bg-white/5 hover:bg-white/10 transition-all duration-300">
      <Chart options={options} series={series} type="bar" height={500} />
    </div>
    // <div className="max-w-[1200px] h-[600px] w-[70vw] border-2 border-white m-auto mb-4 rounded-[15px] mt-4 shadow-[3px_3px_10px_white] hover:shadow-none transition-all duration-500 overflow-hidden  ease-in-out shadow-white hover:bg-white/7 bg-white/5">
    //   <span className="shadow"></span>
    //   <ResponsiveContainer>
    //     <BarChart data={Array.isArray(Data) ? Data : []}>
    //       {/* <CartesianGrid stroke={"#ccc"} strokeDasharray={"1 3"} /> */}
    //       <XAxis dataKey={"source"} />
    //       <YAxis />
    //       <Tooltip />
    //       <Bar
    //         dataKey={"amount"}
    //         radius={[10, 10, 0, 0]}
    //         activeBar={{
    //           fill: "#0056b3",
    //           stroke: "#003f88", // optional border on hover
    //           strokeWidth: 2,
    //         }}
    //       >
    //         {(Array.isArray(Data) ? Data : []).map((entry, index) => (
    //           <Cell
    //             key={`cell-${index}`}
    //             fill={index % 2 === 0 ? "#007bff" : "#5a86ad"}
    //           />
    //         ))}
    //       </Bar>
    //     </BarChart>
    //   </ResponsiveContainer>
    // </div>
  );
};

export default Barchart;

// const BarChartApex = ({ Data }) => {

//   return (

//   );
// };

// export default BarChartApex;
