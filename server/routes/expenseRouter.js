import express from "express";
import { addExpense } from "../controller/expenseController.js";
const router = express.Router();
router.post("/add-expense", addExpense);
export default router;
