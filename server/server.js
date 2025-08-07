import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDb } from "./db/ConnectDb.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//mongodb connection

ConnectDb();

// api calls
app.get("/", (req, res, next) => res.send("Server is Done"));
app.use("/auth", authRoutes);
// app listening
const PORT = process.env.PORT || 8000;
console.log(PORT);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
