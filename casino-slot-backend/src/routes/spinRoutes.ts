import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { spin } from "../controllers/spinController";

const router = express.Router();

router.post("/", authMiddleware, spin);

export default router;
