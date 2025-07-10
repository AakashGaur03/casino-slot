import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		wager: { type: Number, required: true },
		result: { type: [String], required: true }, // e.g., ["🍒", "🍋", "💎"]
		winAmount: { type: Number, required: true },
	},
	{ timestamps: true }
);
transactionSchema.index({ userId: 1, createdAt: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
