import React, { useEffect } from "react";
import Container from "../components/layout/Container";
import { getUser } from "../helper.js/getUser.js";
import { useState } from "react";
import axios from "axios";
import BarChart from "../components/Barchart.jsx";
import { useRef } from "react";
import IncomeResources from "../components/IncomeResources.jsx";
import FormDatails from "../components/FormDetails.jsx";
import { API_URL } from "../config.js";

const Income = () => {
  const [showForm, setshowForm] = useState(false);
  const [Data, setData] = useState([]);
  //const [total, settotal] = useState("");
  useEffect(() => {
    const fetchIncomeData = async () => {
      let userId = await getUser();
      console.log(userId);
      if (!userId) {
        console.error("No user ID available");
        return;
      }

      let total;
      axios
        .get(`${API_URL}/income/chart-data/${userId}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.error(err));
    };
    fetchIncomeData();
  }, []);

  const formRef = useRef();
  return (
    <Container>
      <div className="grid grid-cols-1 text-white ">
        <div className="relative">
          <div className="">
            <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-20"></span>
            <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-20"></span>
          </div>
          <BarChart Data={Data} setshowForm={setshowForm} />
          <ButtonForAdd setshowForm={setshowForm} />
        </div>
        {Data && Data.length > 0 ? (
          <div className="">
            <div className="">
              <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-20"></span>
              <span className="shadow-[0px_0px_1000px_60px_rgba(29,78,216,1)] w-20"></span>
            </div>
            <IncomeResources
              Data={Data}
              setData={setData}
              onDashboard={false}
              header="Income Resources"
              buttonText={"Download"}
            />
          </div>
        ) : (
          <></>
        )}
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
export const ButtonForAdd = ({ setshowForm }) => {
  return (
    <button
      className="absolute top-3 right-0 p-2 rounded-2xl bg-primary-blue flex items-center justify-center text-white"
      onClick={() => setshowForm(true)}
    >
      + Income
    </button>
  );
};
export default Income;

// FormDetails.jsx
