import express from "express";
import { getBalance, getTransactions } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.get("/transactions", authMiddleware, getTransactions);

export default router;
