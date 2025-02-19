import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Dừng server nếu không kết nối được
  }
};

connectDB();


app.use(cors());
app.use(cookieParser());
app.use(express.json());    

app.listen(5000, () => {
  console.log(`Server đang chạy tại http://localhost:5000`);
});
