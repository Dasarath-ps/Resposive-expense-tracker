import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  incomes: [
    {
      amount: { type: Number, required: true },
      source: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});
const Income = mongoose.model("Income", incomeSchema);
export default Income;
