import React from "react";
import Chart from "react-apexcharts";

const DonutChartApex = ({ Data, header }) => {
  console.log(header);
  if (!Array.isArray(Data) || Data.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center overflow-hidden bg-background z-100">
        <h3 className="text-white text-2xl">No Data Available</h3>
      </div>
    );
  }
  const hasTypeField = Data.some((item) => item.type);
  const incomeColors = [
    "#4CAF50", // Green
    "#2196F3", // Blue
    "#FF9800", // Orange
    "#E91E63", // Pink
    "#9C27B0", // Purple
    "#00BCD4", // Cyan
    "#FFC107", // Amber
    "#8BC34A", // Light Green
    "#FF5722", // Deep Orange
  ];
  var barColors = [];
  if (hasTypeField) {
    // If data has type, use red/green dynamically
    barColors = Data.map((item) =>
      item.type === "income" ? "#00E396" : "#FF4560"
    );
  } else {
    // Otherwise (like your income route), use varied green tones
    barColors = Data.map(
      (_, index) => incomeColors[index % incomeColors.length]
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
        gradientToColors: barColors,
        stops: [0, 100],
      },
    },
    colors: ["#00E396", "#008FFB", "#FF4560", "#775DD0"],
  };

  const series = Data.map((item) => item.amount);

  return (
    <div
      className={
        /*"flex justify-center items-center p-6  rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500 h-[450px]"*/ ``
      }
    >
      <h2 className="text-white text-2xl font-itim text-center mb-4  decoration-2 underline">
        {header}
      </h2>
      <Chart options={options} series={series} type="donut" height={350} />
    </div>
  );
};

export default DonutChartApex;
