import express from "express";
import { generateStockReport } from "../controller/report.js";

const reportRouter = express.Router();

reportRouter.get("/report/stock", generateStockReport);

export default reportRouter;