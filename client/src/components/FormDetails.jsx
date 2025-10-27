import { useState, useEffect } from "react";
import { getUser } from "../helper.js/getUser";
import axios from "axios";
//import { API_URL } from "../config.js";

export const FormDatails = ({ formRef, showForm, setshowForm, setData }) => {
  const [Source, setSource] = useState("");
  const [Amount, setAmount] = useState("");
  const [date, setdate] = useState("");
  const [Error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

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
      const res = await axios.post(`${apiUrl}/income/add-source`, {
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
        value={Source || ""}
        placeholder="Source"
        onChange={(e) => setSource(e.target.value)}
        className=" border p-2 rounded "
      />
      <input
        type="number"
        value={Amount || ""}
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

export default FormDatails;
