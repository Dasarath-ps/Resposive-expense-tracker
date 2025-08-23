import express from "express";
import {
  addNewSource,
  deleteIncomeResources,
  getIncomeDate,
} from "../controller/incomeController.js";
const router = express.Router();

router.post("/add-source", addNewSource);

router.get("/chart-data/:userId", getIncomeDate);

router.post("/delete", deleteIncomeResources);

export default router;
