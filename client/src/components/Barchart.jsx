import React from "react";
import image from "../assets/images/404.png";
import Chart from "react-apexcharts";
import { ButtonForAdd } from "../pages/Income";
import Loader from "../components/Loader"; // <-- your loading animation component

const Barchart = ({ Data, setshowForm }) => {
  console.log(Data);

  if (!Array.isArray(Data) || Data.length == 0) {
    return (
      <Container>
        <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center">
          <Loader /> {/* Your loading spinner/animation component */}
          <p className="text-white mt-4">Loading data...</p>
        </div>
        <ButtonForAdd setshowForm={setshowForm} />
      </Container>
    );
  }
  const hasTypeField = Data.some((item) => item.type);
  const incomeColors = [
    "#00E396",
    "#00C97C",
    "#00B368",
    "#009E55",
    "#008A45",
    "#00D78A",
    "#00FFB2",
  ];
  let barColors = [];

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
        borderRadius: 9,
        columnWidth: "50%",
        distributed: true, // makes each bar different color
      },
    },
    colors: barColors,
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
    legend: {
      show: false, // 👈 this line removes the color boxes (legend)
    },
  };

  const series = [
    {
      name: "Amount",
      data: Data.map((item) => item.amount),
    },
  ];
  return (
    <div className="mt-6 mx-5 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500 overflow-hidden z-200">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400}
        width="100%"
      />
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
