import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database is connected");
  } catch (err) {
    console.error("❌ Database connection failed");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Full error:", err);
    process.exit(1); // Stop the server if DB connection fails
  }
};
