// middleware/restrictGuest.js

import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import mongoose from "mongoose";
export const restrictGuest = (req, res, next) => {
  if (req.user?.role === "guest") {
    return res
      .status(403)
      .json({ message: "Guests cannot perform this action" });
  }
  next();
};

// Get last 30 days income and expenses

export const getLast30DaysData = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId.startsWith("guest_")) {
      return res.json({
        data: [
          { type: "expense", name: "Drinking", amount: 2000 },
          { type: "income", name: "Course fee", amount: 7003 },
          { type: "income", name: "Restaurent Sales", amount: 10030 },
          { type: "expense", name: "Tution Fee", amount: 5100 },
          { type: "income", name: "Movies", amount: 8000 },
          { type: "expense", name: "HOSTEL FEE", amount: 5500 },
          { type: "income", name: "fixed deposit", amount: 12000 },
          { type: "expense", name: "vechicle", amount: 3000 },
        ],
      });
    }
    const id = new mongoose.Types.ObjectId(userId);

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Fetch incomes
    const incomeData = await Income.aggregate([
      { $match: { userId: id } },
      { $unwind: "$incomes" },
      { $match: { "incomes.date": { $gte: thirtyDaysAgo, $lte: today } } },
      {
        $project: {
          _id: 0,
          type: { $literal: "income" },
          name: "$incomes.source",
          amount: "$incomes.amount",
          date: "$incomes.date",
        },
      },
    ]);

    // Fetch expenses
    const expenseData = await Expense.aggregate([
      { $match: { userId: id } },
      { $unwind: "$expenses" },
      { $match: { "expenses.date": { $gte: thirtyDaysAgo, $lte: today } } },
      {
        $project: {
          _id: 0,
          type: { $literal: "expense" },
          name: "$expenses.expense",
          amount: "$expenses.amount",
          date: "$expenses.date",
        },
      },
    ]);

    // Combine both arrays
    const combinedData = [...incomeData, ...expenseData];

    // Sort by date (latest first)
    combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Remove date from final output (optional)
    const finalData = combinedData.map(({ type, name, amount }) => ({
      type,
      name,
      amount,
    }));
    //console.log(finalData);
    res.json({
      success: true,
      data: finalData,
    });
  } catch (error) {
    console.error("Error fetching 30-day data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//export { restrictGuest, getLast30DaysData };
