import Income from "../models/Income.js";
import mongoose from "mongoose";
export const addNewSource = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Data doesn't reached in Server." });
  try {
    const { Source, Amount, date, userId } = req.body;

    if (!Source || !Amount || !date || !userId) {
      return res
        .status(400)
        .json({ message: "All input is not reached in Server." });
    }
    const id = new mongoose.Types.ObjectId(userId);
    const existingUser = await Income.findOne({ userId: id });
    if (existingUser) {
      await Income.updateOne(
        { userId: userId },
        {
          $push: {
            incomes: [
              {
                amount: Amount,
                source: Source,
                date: date,
              },
            ],
          },
        }
      );
      return res.status(200).json({ message: "succsess" });
    }

    const newUser = await Income.create({
      userId: id,
      incomes: [
        {
          amount: Amount,
          source: Source,
          date: date,
        },
      ],
    });

    return res.status(200).json({ newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

export const getIncomeDate = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId.startsWith("guest_")) {
      return res.json([
        { source: "Rent", amount: 10000, date: "2025-01-01" },
        { source: "Freelance on MERN", amount: 15000, date: "2025-02-01" },
        { source: "Product Sail", amount: 18000, date: "2025-03-01" },
        { source: "Salary", amount: 26000, date: "2025-03-01" },
        { source: "Divident", amount: 10000, date: "2025-03-01" },
      ]);
    }
    const id = new mongoose.Types.ObjectId(userId);

    // else → fetch from DB
    //Income.find({ userId: id }).then((data) => res.json(data));
    //console.log(userId);
    const data = await Income.findOne({ userId: id });
    //console.log(data);
    if (!data) return res.status(400).json({ message: "Data not fetched" });
    const chartData = data.incomes.map((items) => ({
      source: items.source,
      amount: items.amount,
      date: items.date,
    }));
    //.log(chartData);

    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIncomeResources = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Something went Wrong." });
  try {
    const { element, userId } = req.body;
    const id = new mongoose.Types.ObjectId(userId);
    const data = await Income.findOne({ userId: id });
    if (!data) return res.status(400).json({ message: "Data not fetched" });
    const manipulatedData = await Income.updateOne(
      { userId: id },
      {
        $pull: { incomes: { source: element.source } },
      }
    );
    //console.log(manipulatedData);

    res.status(200).json({ message: "Sucsses" });
  } catch (error) {
    console.log(error);
  }
};
