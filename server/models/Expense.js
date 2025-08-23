import mongoose from "mongoose";
const ExpenseSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  expenses: [
    {
      expense: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
