import React, { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Barchart from "../components/Barchart";
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { getUser } from "../helper.js/getUser";
import axios from "axios";
import CountUp from "react-countup";
import PieChartApex from "../components/Pie";
import IncomeResources from "../components/IncomeResources";
import Loader from "../components/Loader"; // <-- your loading animation component

const Demo = () => {
  const pr = import.meta.env.VITE_REACT_APP_API_URL;
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [Details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUser();
        // Fetch Income
        const incomeRes = await axios.get(`${pr}/income/chart-data/${userId}`);
        const totalIncome = incomeRes.data.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setIncome(totalIncome);

        // Fetch Expenses
        const expenseRes = await axios.post(`${pr}/expense/getallexpenses`, {
          id: userId,
        });
        const totalExpense = expenseRes.data.expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setExpense(totalExpense);

        // Fetch All Details
        const detailsRes = await axios.post(
          `${pr}/income/getAllDetail/${userId}`,
          { userId }
        );
        setDetails(detailsRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ✅ stop loading once data fetch is done
      }
    };

    fetchData();
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

  const filteredExpense = Details.filter((item) => item.type === "expense");
  const filteredIncome = Details.filter((item) => item.type === "income");

  // ✅ Show loader if still loading
  if (loading) {
    return (
      <Container>
        <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center">
          <Loader /> {/* Your loading spinner/animation component */}
          <p className="text-white mt-4">Loading data...</p>
        </div>
      </Container>
    );
  }

  // ✅ Show "No Data Available" if data is empty
  if (Details.length === 0) {
    return (
      <Container>
        <div className="flex flex-col h-[calc(100vh-40px)] items-center justify-center">
          <h3 className="text-white text-2xl">No Data Available</h3>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="flex flex-col min-h-[calc(100vh-70px)] overflow-y-auto p-6 space-y-10 bg-transparent">
        {/* ===== Stats Section ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl backdrop-blur-md bg-dark-grey/60 border border-white/10 shadow-lg 
                         hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex justify-center items-center w-16 h-16 bg-background rounded-full">
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      {stat.title}
                    </p>
                    <h2 className="text-white text-2xl font-bold">
                      $<CountUp end={stat.value} duration={2} separator="," />
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Charts & Transactions Section ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions / IncomeResources */}
          {Details?.length > 0 && (
            <div className="flex justify-center items-stretch w-full">
              <IncomeResources
                Data={Details.map((item) => ({
                  source: item.name,
                  amount: item.amount,
                  type: item.type,
                }))}
                pageType="dashboard"
                header={"Recent Transactions"}
                buttonText={"Download"}
              />
            </div>
          )}

          {/* Pie Chart */}
          <div
            className="flex justify-center items-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                          backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] 
                          transition-all duration-500 min-h-[400px]"
          >
            <PieChartApex
              Data={stats.map((stat) => ({
                source: stat.title,
                amount: stat.value,
              }))}
              header={"Overoll Rate"}
            />
          </div>
        </div>

        {/* ===== Expense & Bar Chart Section ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense List */}
          {filteredExpense?.length > 0 && (
            <div className="flex justify-center items-stretch w-full">
              <IncomeResources
                Data={filteredExpense.map((item) => ({
                  source: item.name,
                  type: item.type,
                  amount: item.amount,
                }))}
                pageType="dashboard"
                header="Expense"
                buttonText={"See all"}
              />
            </div>
          )}

          {/* Bar Chart */}
          {Details?.length > 0 && (
            <div
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                            backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] 
                            transition-all duration-500 min-h-[400px] flex justify-center items-center"
            >
              <Barchart
                Data={Details.map((item) => ({
                  source: item.name,
                  amount: item.amount,
                  type: item.type,
                }))}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div
            className="flex justify-center items-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                          backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] 
                          transition-all duration-500 min-h-[400px]"
          >
            <PieChartApex
              Data={filteredIncome.map((item) => ({
                source: item.name,
                type: item.type,
                amount: item.amount,
              }))}
              header={"Last 60 Days Income"}
            />
          </div>
          {/* Income List */}
          {filteredIncome?.length > 0 && (
            <div className="flex justify-center items-stretch w-full">
              <IncomeResources
                Data={filteredIncome.map((item) => ({
                  source: item.name,
                  type: item.type,
                  amount: item.amount,
                }))}
                pageType="dashboard"
                header="Income"
                buttonText={"See all"}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Demo;
