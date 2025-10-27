import React, { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import { useGetAllProductsQuery } from "../service/api";
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { getUser } from "../helper.js/getUser";
import axios from "axios";
import CountUp from "react-countup";
import { API_URL } from "../config.js";

const Dashboard = () => {
  // const { data, error, isLoading } = useGetAllProductsQuery();
  // if (error) {
  //   return (
  //     <div className="text-red-500 flex justify-center items-center">
  //       Something Went Wrong
  //     </div>
  //   );
  // }
  // if (isLoading) {
  //   return (
  //     <div className="text-red-500 flex justify-center items-center">
  //       Data is Loading...
  //     </div>
  //   );
  // }
  const [expense, setexpense] = useState([]);
  const [income, setincome] = useState();
  useEffect(() => {
    const fetchIncomeData = async () => {
      let userId = await getUser();

      axios
        .get(`${API_URL}/income/chart-data/${userId}`)
        .then((res) => {
          //console.log(res.data);

          const total = res.data.reduce((sum, item) => sum + item.amount, 0);
          setincome(total);
        })
        .catch((err) => console.error(err));
    };
    fetchIncomeData();
  }, []);
  useEffect(() => {
    const getExpneses = async () => {
      try {
        const id = await getUser();

        axios.post(`${API_URL}/expense/getallexpenses`, { id }).then((res) => {
          console.log(res.data);
          const total = res.data.expenses.reduce(
            (sum, item) => sum + item.amount,
            0
          );
          setexpense(total);
          console.log(total);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getExpneses();
  }, []);
  const balance = income - expense;
  const stats = [
    {
      title: "Balance",
      value: balance,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Income",
      value: income,
      icon: ArrowUpCircle,
      color: "text-blue-500",
    },
    {
      title: "Expense",
      value: expense,
      icon: ArrowDownCircle,
      color: "text-red-500",
    },
  ];
  return (
    <Container>
      <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-5 min-h-80 md:min-h-full max-w-[1200px] m-auto my-10 bg-background">
        {stats.map((stat) => (
          <div className="grid grid-cols-2 justify-center items-center  rounded-lg mx-2 md:max-h-25 transition-all duration-300 ease-in-out bg-dark-grey hover:bg-hover-color border-transparent border-2 hover:border-white">
            <div className="flex justify-center items-center ">
              <div className="flex justify-center items-center w-20 h-20 bg-background rounded-full">
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-gray-400 text-md uppercase">{stat.title}</h2>
              {/* {stat.title === "Balance" && (
                <h3 className="text-white text-2xl font-bold">${stat.value}</h3>
              )}
              {stat.title === "Income" && <h3>${stat.value}</h3>}
              {stat.title === "Expense" && <h3>${stat.value}</h3>} */}
              <h2 className="text-white text-2xl font-bold">
                $<CountUp end={stat.value} duration={2} separator="," />
              </h2>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;
