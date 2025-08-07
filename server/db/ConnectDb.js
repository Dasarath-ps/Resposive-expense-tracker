import mongoose from "mongoose";
export const ConnectDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/expenses-tracker")
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
