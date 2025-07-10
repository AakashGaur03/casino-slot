import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import User from "../models/User";
import redis from "../config/redis";

export const getLeaderboard = async (req: Request, res: Response) => {
	const days = parseInt(req.query.days as string) || 7;
	const cacheKey = `leaderboard:${days}d`;

	try {
		// 1️⃣ Check cache
		const cached = await redis.get(cacheKey);
		if (cached) {
			return res.json({ fromCache: true, data: JSON.parse(cached) });
		}

		const since = new Date();
		since.setDate(since.getDate() - days);

		// 2️⃣ Aggregate net wins
		const leaderboard = await Transaction.aggregate([
			{ $match: { createdAt: { $gte: since } } },
			{
				$group: {
					_id: "$userId",
					totalWager: { $sum: "$wager" },
					totalWin: { $sum: "$winAmount" },
					netWin: { $sum: { $subtract: ["$winAmount", "$wager"] } },
				},
			},
			{ $sort: { netWin: -1 } },
			{ $limit: 10 },
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$project: {
					username: { $arrayElemAt: ["$user.username", 0] },
					netWin: 1,
				},
			},
		]);

		// 3️⃣ Cache it for 2 mins
		await redis.set(cacheKey, JSON.stringify(leaderboard), "EX", 120);

		res.json({ fromCache: false, data: leaderboard });
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch leaderboard", error: err });
	}
};
