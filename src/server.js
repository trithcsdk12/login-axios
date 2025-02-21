import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./authRoutes.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
