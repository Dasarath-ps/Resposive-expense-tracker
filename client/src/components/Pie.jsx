import React from "react";
import Chart from "react-apexcharts";

const DonutChartApex = ({ Data }) => {
  if (!Array.isArray(Data) || Data.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center overflow-hidden bg-background z-100">
        <h3 className="text-white text-2xl">No Data Available</h3>
      </div>
    );
  }

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    labels: Data.map((item) => item.source),
    legend: {
      position: "bottom",
      labels: { colors: "#fff", useSeriesColors: true },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ["#fff"], fontSize: "14px" },
      dropShadow: { enabled: true, blur: 3, opacity: 0.5 },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: [
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#008FFB",
        ],
        stops: [0, 100],
      },
    },
    colors: ["#00E396", "#008FFB", "#FF4560", "#775DD0"],
  };

  const series = Data.map((item) => item.amount);

  return (
    <div className="max-w-[800px] h-[400px] md:w-[30vw] flex justify-center  m-auto mt-6 p-4 rounded-2xl shadow-lg bg-white/5 hover:bg-white/10 transition-all duration-300 md:mt-6 overflow-hidden z-100">
      <Chart options={options} series={series} type="donut" height={350} />
    </div>
  );
};

export default DonutChartApex;
