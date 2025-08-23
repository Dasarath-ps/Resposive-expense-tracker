import React, { useEffect } from "react";
import Container from "../components/layout/Container";
import { getUser } from "../helper.js/getUser.js";
import { useState } from "react";
import axios from "axios";
import BarChart from "../components/Barchart.jsx";
import { useRef } from "react";
import IncomeResources from "../components/IncomeResources.jsx";
const Income = () => {
  const [showForm, setshowForm] = useState(false);
  const [Data, setData] = useState([]);
  const pr = import.meta.env.VITE_API_URL;
  console.log(pr);
  useEffect(() => {
    const fetchIncomeData = async () => {
      let userId = await getUser();
      axios
        .get(`${pr}/income/chart-data/${userId}`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    };
    fetchIncomeData();
  }, []);

  const formRef = useRef();
  return (
    <Container>
      <div className="grid grid-cols-1 text-white ">
        <div className="relative">
          <BarChart Data={Data} />
          <button
            className="absolute top-3 right-2 bg-primary-blue p-2 rounded-2xl "
            onClick={() => setshowForm(true)}
          >
            + Income
          </button>
        </div>
        <IncomeResources Data={Data} setData={setData} />
      </div>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40">
          <div ref={formRef} className="p-6 bg-white rounded w-full max-w-md">
            <FormDatails
              formRef={formRef}
              showForm={showForm}
              setshowForm={setshowForm}
              setData={setData}
            />
            <div className="mt-4 text-right">
              <button
                onClick={() => setshowForm(false)}
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

export default Income;

// FormDetails.jsx

export const FormDatails = ({ formRef, showForm, setshowForm }) => {
  const [Source, setSource] = useState("");
  const [Amount, setAmount] = useState();
  const [date, setdate] = useState();
  const [Error, setError] = useState("");

  useEffect(() => {
    const handle = (e) => {
      if (showForm && !formRef.current.contains(e.target)) {
        setshowForm(false);
      }
    };

    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = await getUser();
    if (!Source || !Amount || !date) return setError("All field should fill!.");
    try {
      const res = await axios.post("http://localhost:8000/income/add-source", {
        userId,
        Source,
        Amount,
        date,
      });
      console.log(res.data);
      setshowForm(false);
      setData((prev) => [
        ...prev,
        { source: Source, amount: Number(Amount), date },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={Source}
        placeholder="Source"
        onChange={(e) => setSource(e.target.value)}
        className=" border p-2 rounded "
      />
      <input
        type="number"
        value={Amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        className=" border p-2 rounded "
      />
      <input
        type="date"
        value={date}
        className="border p-2 rounded"
        onChange={(e) => setdate(e.target.value)}
        placeholder="Date"
      />
      <button type="submit" className="text-white bg-green-500 p-2 rounded">
        Save
      </button>
      {Error ? <p className="text-red-400">{Error}</p> : <></>}
    </form>
  );
};
