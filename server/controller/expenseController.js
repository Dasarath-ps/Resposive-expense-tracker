import Expense from "../models/Expense.js";
import mongoose from "mongoose";
export const addExpense = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ messsage: " No field are Existed" });
  const { expenseSource, dateOfExpense, expenseAmount, userId } = req.body;
  try {
    if (!expenseSource || !dateOfExpense || !expenseAmount) {
      return res
        .status(400)
        .json({ messsage: "Not all input are reached in server" });
    }
    const id = new mongoose.Types.ObjectId(userId);
    console.log(id);

    const existingUser = await Expense.findOne({ userId: id });
    if (!existingUser) {
      const newUser = await Expense.create({
        userId: id,
        expenses: [
          {
            expense: expenseSource,
            amount: expenseAmount,
            date: dateOfExpense,
          },
        ],
      });
      return res.status(200).json({ messsage: "new user expense" });
    }

    const allExpense = await Expense.updateOne(
      { userId: id },
      {
        $push: {
          expenses: [
            {
              expense: expenseSource,
              amount: expenseAmount,
              date: dateOfExpense,
            },
          ],
        },
      }
    );
    res.status(200).json({ allExpense });
  } catch (error) {
    return res.status(500).json({ messsage: error });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = new mongoose.Types.ObjectId(id);
    //console.log(id);
    const expenses = await Expense.findOne({ userId: userId });
    //console.log(expenses.expenses);
    return res.status(200).json({ expenses: expenses.expenses });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};
export const deleteAnExpense = async (req, res) => {
  const { userId, element } = req.body;
  console.log(userId, element);
};
