import React, { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  LucideAlignVerticalDistributeCenter,
} from "lucide-react";
import { getUser } from "../helper.js/getUser";
import axios from "axios";
import CountUp from "react-countup";
import PieChartApex from "../components/Pie";
import LineBar from "../components/LineBar";
const Demo = () => {
  const pr = import.meta.env.VITE_API_URL;
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        let userId = await getUser();
        console.log(userId);
        const res = await axios.get(`${pr}/income/chart-data/${userId}`);
        console.log(res.data);

        const total = res.data.reduce((sum, item) => sum + item.amount, 0);
        setIncome(total);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIncome();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const id = await getUser();
        const res = await axios.post(
          "http://localhost:8000/expense/getallexpenses",
          { id }
        );
        const total = res.data.expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setExpense(total);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenses();
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
  console.log(stats);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl m-auto my-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl backdrop-blur-md bg-dark-grey/60 border border-white/10 
                       shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-around items-center space-x-4">
              <div className="flex justify-center items-center w-16 h-16 bg-background rounded-full">
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase">{stat.title}</p>
                <h2 className="text-white text-2xl font-bold">
                  $<CountUp end={stat.value} duration={2} separator="," />
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row relative">
        <div className="">
          <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-20"></span>
          <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-20"></span>
        </div>
        {stats && (
          <LineBar
            Data={stats.map((stat) => ({
              source: stat.title,
              amount: stat.value,
            }))}
          />
        )}

        {stats && (
          <PieChartApex
            Data={stats.map((stat) => ({
              source: stat.title,
              amount: stat.value,
            }))}
          />
        )}
        <div className="absolute right-0 bottom-50">
          <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-10"></span>
          <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-10"></span>
        </div>
      </div>
    </Container>
  );
};

export default Demo;
