import React from "react";
import Chart from "react-apexcharts";

const GlowingLineChart = ({ Data }) => {
  console.log(Data);
  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
      foreColor: "#94a3b8", // gray labels
      animations: { easing: "easeinout", speed: 900 },
    },
    stroke: { curve: "smooth", width: 4 },
    xaxis: {
      categories: Data.map((d) =>
        new Date(d.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })
      ),
      labels: { style: { colors: "#cbd5e1" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: "#cbd5e1" } },
    },
    grid: {
      borderColor: "#334155",
      strokeDashArray: 4,
    },
    colors: ["#3b82f6", "#f59e0b"], // Blue + Amber
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.6,
        gradientToColors: ["#60a5fa", "#fbbf24"],
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    markers: {
      size: 6,
      colors: ["#0f172a"],
      strokeColors: ["#3b82f6", "#f59e0b"],
      strokeWidth: 3,
      hover: { size: 9 },
    },
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM" },
      style: { fontSize: "14px" },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      labels: { colors: "#e2e8f0" },
    },
  };

  const series = [
    {
      name: "Expenses",
      data: Data.map((d) => d.amount),
    },
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl max-w-1200px m-auto w-[100%] md:w-[calc(70vw-280px)] overflow-hidden z-100">
      <Chart options={options} series={series} type="area" height={420} />
    </div>
  );
};

export default GlowingLineChart;
