import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import User from "../models/User";
import { spinReels, calculatePayout } from "../utils/spinLogic";

export const spin = async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const { wager } = req.body;

	if (!wager || wager <= 0) {
		return res.status(400).json({ message: "Invalid wager amount" });
	}

	try {
		const user = await User.findById(userId);
		if (!user || user.balance < wager) {
			return res.status(400).json({ message: "Insufficient balance" });
		}

		const result = spinReels();
		const winAmount = calculatePayout(result, wager);

		// Update balance
		user.balance = user.balance - wager + winAmount;
		await user.save();

		// Save transaction
		await Transaction.create({
			userId,
			wager,
			result,
			winAmount,
		});

		res.json({
			result,
			wager,
			winAmount,
			newBalance: user.balance,
		});
	} catch (err) {
		res.status(500).json({ message: "Spin failed", error: err });
	}
};
