import { useState } from "react";
import API from "../api/axios";
import { handleApiError } from "../utils/handleApiError";
import toast from "react-hot-toast";
import SpinInfoTooltip from "./SpinInfoTooltip";

const symbols = ["🍒", "🍋", "⭐", "💎"];

const SpinSection = ({ onSpin, refreshBalance }: { onSpin: () => void; refreshBalance: () => void }) => {
	const [wager, setWager] = useState("100");
	const [result, setResult] = useState<string[] | null>(null);
	const [winAmount, setWinAmount] = useState<number | null>(null);
	const [isFreeSpin, setIsFreeSpin] = useState(false);
	const [spinningSlots, setSpinningSlots] = useState<string[]>(["", "", ""]);
	const [isSpinning, setIsSpinning] = useState(false);

	const spin = async () => {
		try {
			const numericWager = parseInt(wager);
			if (isNaN(numericWager) || numericWager < 1) {
				toast.error("Please enter a valid wager amount");
				return;
			}
			setIsSpinning(true);
			const interval = setInterval(() => {
				setSpinningSlots([
					symbols[Math.floor(Math.random() * symbols.length)],
					symbols[Math.floor(Math.random() * symbols.length)],
					symbols[Math.floor(Math.random() * symbols.length)],
				]);
			}, 100);

			// Call backend while animation is running
			const res = await API.post("/spin", { wager });

			// Wait for 2 seconds before showing result
			setTimeout(() => {
				clearInterval(interval);
				setIsSpinning(false);
				setResult(res.data.result);
				setWinAmount(res.data.winAmount);
				setIsFreeSpin(res.data.isFreeSpin || false);

				onSpin();
				refreshBalance();

				if (res.data.isFreeSpin) {
					toast.success("🎁 You got a free spin!");
				}
				if (res.data.winAmount > 0) {
					toast.success(`🎉 You won ₹${res.data.winAmount}`);
				} else {
					toast("Better luck next time!");
				}
			}, 2000);
		} catch (err) {
			handleApiError(err, "Spin failed");
			setIsSpinning(false);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<h3 className="text-lg font-semibold">🎰 Spin the Slot</h3>

				<SpinInfoTooltip />
			</div>

			<input
				type="number"
				min={1}
				value={wager}
				onChange={(e) => setWager(e.target.value)}
				className="border p-2 w-full"
				placeholder="Enter wager"
				disabled={isSpinning}
			/>

			<button
				className={`bg-purple-600 text-white px-4 py-2 w-full transition-opacity duration-300 ${
					isSpinning ? "opacity-50 cursor-not-allowed" : ""
				}`}
				onClick={spin}
				disabled={isSpinning}
			>
				{isSpinning ? "Spinning..." : "Spin 🎰"}
			</button>

			<div className="text-center space-y-2 mt-4 text-3xl">
				{isSpinning && <div>{spinningSlots.join(" ")}</div>}
				{!isSpinning && result && <div>{result.join(" ")}</div>}
			</div>

			{result && !isSpinning && (
				<div className="text-center space-y-1">
					{isFreeSpin && <div className="text-blue-600 font-bold text-sm">🎁 You got a free spin!</div>}
					<div className="text-green-600 font-bold">You won ₹{winAmount}</div>
				</div>
			)}
		</div>
	);
};

export default SpinSection;
