import React, { useEffect, useId, useState } from "react";
import { IoTrendingDownOutline } from "react-icons/io5";
import Container from "../components/layout/Container";
import FormDatails from "../components/FormDetails";
import { useRef } from "react";
import LineBar from "../components/LineBar";
import axios from "axios";
import { getUser } from "../helper.js/getUser";
import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";

const Expenses = () => {
  const [expenseSource, setexpenseSource] = useState("");
  const [dateOfExpense, setdateOfExpense] = useState("");
  const [expenseAmount, setexpenseAmount] = useState("");
  const [ShowForm, setShowForm] = useState(false);
  const [error, seterror] = useState("");
  const [Data, setData] = useState([]);
  const [highlight, sethighlight] = useState(false);
  const formRef = useRef();
  // console.log(ShowForm);

  useEffect(() => {
    const getExpneses = async () => {
      try {
        const id = await getUser();
        axios
          .post("http://localhost:8000/expense/getallexpenses", { id })
          .then((res) => {
            setData(res.data.expenses);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getExpneses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = await getUser();
    if (!expenseSource || !dateOfExpense || !expenseAmount) {
      return seterror("All field are Required...");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/expense/add-expense",
        {
          expenseSource,
          dateOfExpense,
          expenseAmount,
          userId,
        }
      );
      // console.log(res.data);

      setData((prev) => [
        ...prev,
        { expense: expenseSource, amount: expenseAmount, date: dateOfExpense },
      ]);

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteExpense = async (element) => {
    //e.preventDefault();
    try {
      const userId = await getUser();
      console.log(userId);

      const res = axios.post("http://localhost:8000/expense/delete", {
        userId,
        element,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className=" border-2 border-white pt-12 p-3 m-2 rounded-xl relative">
        <LineBar Data={Data} />
        <button
          onClick={() => setShowForm(true)}
          className="px-2 py-2 bg-primary-blue text-white text-md rounded-lg absolute
        top-3 right-3"
        >
          + Expense
        </button>

        {ShowForm && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/40">
            <div ref={formRef} className="p-6 bg-white rounded w-full max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  value={expenseSource}
                  className="border p-2 rounded-xl"
                  type="text"
                  placeholder="Expense"
                  onChange={(e) => setexpenseSource(e.target.value)}
                />
                <input
                  value={dateOfExpense}
                  className="border p-2 rounded-xl"
                  type="Date"
                  placeholder="Date"
                  onChange={(e) => setdateOfExpense(e.target.value)}
                />
                <input
                  value={expenseAmount}
                  className="border p-2 rounded-xl"
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => setexpenseAmount(e.target.value)}
                />
                <button className="bg-green-500 text-white min-w-[60%] m-auto py-2 text-lg rounded-xl">
                  Save
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </form>
              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white px-3 py-1 bg-red-500 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-2   border-white m-2 p-3 rounded-lg">
        <h2 className="text-white">Expenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Data && Data.length > 0 ? (
            Data.map((element) => {
              let formatedDate = new Date(element.date).toLocaleDateString();

              return (
                <div
                  key={element._id}
                  className="group text-white flex justify-between items-center border-2 border-white rounded-lg mt-1 px-8 py-5"
                >
                  <div className="left-section grid gap-2">
                    <div>{element.expense}</div>
                    <div>{formatedDate}</div>
                  </div>
                  <div className="flex justify-center items-center gap-6">
                    <div className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full flex justify-center items-center bg-white text-red-500 transition-all duration-300 ease-in-out">
                      <button onClick={() => deleteExpense(element)}>
                        <FaRegTrashAlt />
                      </button>
                    </div>
                    <div className="right-section flex justify-between items-center gap-3 bg-red-600 p-1.5 rounded-lg w-20">
                      <IoTrendingDownOutline />
                      <div>{element.amount}</div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Expenses;
