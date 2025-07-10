import { Request, Response } from "express";
import User from "../models/User";
import Transaction from "../models/Transaction";

export const getTransactions = async (req: Request, res: Response) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;
	const skip = (page - 1) * limit;

	try {
		const userId = req.user?.userId;

		const [transactions, total] = await Promise.all([
			Transaction.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
			Transaction.countDocuments({ userId }),
		]);

		res.json({
			page,
			totalPages: Math.ceil(total / limit),
			totalTransactions: total,
			transactions,
		});
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch transactions", error: err });
	}
};

export const getBalance = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user?.userId).select("balance");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json({ balance: user.balance });
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch balance", error: err });
	}
};
