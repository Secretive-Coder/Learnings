import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("MONGODB_URL is not defined in .env file");
    }
    await mongoose.connect(url);

    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    throw err;
  }
};
