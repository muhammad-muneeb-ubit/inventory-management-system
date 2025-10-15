import express from "express";
import { generateStockReport } from "../controller/report.js";
import { authMiddleware, authorizeRoles } from "../midddleware/auth.js";

const reportRouter = express.Router();

reportRouter.use(authMiddleware);
reportRouter.use(authorizeRoles("admin"));

reportRouter.get("/report/stock", generateStockReport);

export default reportRouter;