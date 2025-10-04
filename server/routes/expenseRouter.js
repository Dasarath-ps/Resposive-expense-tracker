import express from "express";
import {
  addExpense,
  getAllExpenses,
  deleteAnExpense,
} from "../controller/expenseController.js";
const router = express.Router();

router.post("/add-expense", addExpense);
router.post("/delete", deleteAnExpense);
router.post("/getallexpenses", getAllExpenses);
export default router;
