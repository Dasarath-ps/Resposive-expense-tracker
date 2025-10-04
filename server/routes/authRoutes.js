import express from "express";
import jwt from "jsonwebtoken";
import {
  userLogin,
  userRegistration,
  getUser,
} from "../controller/authController.js";
const router = express.Router();
// routes/auth.js

router.post("/guest-login", async (req, res) => {
  // create a dummy guest user
  const guestUser = {
    _id: "guest_" + Date.now(), // unique id each time
    role: "guest",
    name: "Guest User",
    email: "guest@example.com",
  };

  // sign token
  const token = await jwt.sign(guestUser, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  res.json({ token, user: guestUser });
});

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/login", getUser, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;
