import express from "express";
import {
  addNewSource,
  deleteIncomeResources,
  getIncomeDate,
} from "../controller/incomeController.js";
import restrictGuest from "../controller/middleware.js";
const router = express.Router();

router.post("/add-source", restrictGuest, addNewSource);

router.get("/chart-data/:userId", getIncomeDate);

router.post("/delete", deleteIncomeResources);

export default router;
