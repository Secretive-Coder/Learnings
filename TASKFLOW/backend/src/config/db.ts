import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gilgameshfate069:Gilgamesh@12345@cluster0.3al2prw.mongodb.net/Taskflow"
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    throw err;
  }
};
