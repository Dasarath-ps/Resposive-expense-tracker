import express from "express";
import {
  userLogin,
  userRegistration,
  getUser,
} from "../controller/authController.js";
const router = express.Router();
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/login", getUser, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;
