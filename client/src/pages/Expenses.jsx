import React, { useState } from "react";
import Container from "../components/layout/Container";
import { FormDatails } from "./Income";
import { useRef } from "react";
const Expenses = () => {
  const [ShowForm, setShowForm] = useState(false);
  const formRef = useRef();
  console.log(ShowForm);
  return (
    <Container>
      <button
        onClick={() => setShowForm(true)}
        className="px-2 py-2 bg-primary-blue text-white text-md rounded-lg absolute right-0"
      >
        + Expense
      </button>
      {ShowForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40">
          <div ref={formRef} className="p-6 bg-white rounded w-full max-w-md">
            <form className="flex flex-col gap-5">
              <input
                className="border p-2 rounded-xl"
                type="text"
                placeholder="Expense"
              />
              <input
                className="border p-2 rounded-xl"
                type="Date"
                placeholder="Date"
              />
              <input
                className="border p-2 rounded-xl"
                type="number"
                placeholder="Amount"
              />
              <button className="bg-green-500 text-white min-w-[60%] m-auto py-2 text-lg rounded-xl">
                Save
              </button>
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
    </Container>
  );
};

export default Expenses;
