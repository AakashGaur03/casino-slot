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
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isFreeSpin = Math.random() < 0.1;

		if (!isFreeSpin && user.balance < wager) {
			return res.status(400).json({ message: "Insufficient balance" });
		}

		if (!isFreeSpin) {
			user.balance -= wager;
		}

		const result = spinReels();
		const winAmount = calculatePayout(result, wager);

		user.balance += winAmount;
		await user.save();

		await Transaction.create({
			userId,
			wager: isFreeSpin ? 0 : wager,
			result,
			winAmount,
		});

		res.json({
			result,
			wager: isFreeSpin ? 0 : wager,
			winAmount,
			newBalance: user.balance,
			isFreeSpin,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Spin failed", error: err });
	}
};
