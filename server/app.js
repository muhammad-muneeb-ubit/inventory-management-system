import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./route/product.js";
import { createDefaultAdmin } from "./config/createAdmin.js";
import authRouter from "./route/auth.js";
import userRouter from "./route/user.js";
import reportRouter from "./route/report.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();



createDefaultAdmin();
app.use("/api/product", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", reportRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
