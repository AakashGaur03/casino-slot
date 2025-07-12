import { useState } from "react";
import API from "../api/axios";
import { handleApiError } from "../utils/handleApiError";
import toast from "react-hot-toast";

const SpinSection = ({
	onSpin,
	refreshBalance,
}: {
	onSpin: (result: string[], winAmount: number) => void;
	refreshBalance: () => void;
}) => {
	const [wager, setWager] = useState("100");
	const [result, setResult] = useState<string[] | null>(null);
	const [winAmount, setWinAmount] = useState<number | null>(null);
	const [isFreeSpin, setIsFreeSpin] = useState(false);

	const spin = async () => {
		try {
			// Reset previous result state
			setResult(null);
			setWinAmount(null);
			setIsFreeSpin(false);
			const numericWager = parseInt(wager);
			if (isNaN(numericWager) || numericWager < 1) {
				toast.error("Please enter a valid wager amount");
				return;
			}
			const res = await API.post("/spin", { wager });

			setResult(res.data.result);
			setWinAmount(res.data.winAmount);
			setIsFreeSpin(res.data.isFreeSpin || false);

			onSpin(res.data.result, res.data.winAmount);
			refreshBalance();
			if (res.data.isFreeSpin) {
				toast.success("🎁 You got a free spin!");
			}
			if (res.data.winAmount > 0) {
				toast.success(`🎉 You won ₹${res.data.winAmount}`);
			} else {
				toast("Better luck next time!");
			}
		} catch (err) {
			handleApiError(err, "Spin failed");
		}
	};

	return (
		<div className="space-y-2">
			<h3 className="text-lg font-semibold">🎰 Spin the Slot</h3>

			<input
				type="number"
				min={1}
				value={wager}
				onChange={(e) => setWager(e.target.value)}
				className="border p-2 w-full"
				placeholder="Enter wager"
			/>

			<button className="bg-purple-600 text-white px-4 py-2 w-full" onClick={spin}>
				Spin 🎰
			</button>

			{result && (
				<div className="text-center space-y-2 mt-4">
					<div className="text-3xl">{result.join(" ")}</div>
					{isFreeSpin && <div className="text-blue-600 font-bold text-sm">🎁 You got a free spin!</div>}
					<div className="text-green-600 font-bold">You won ₹{winAmount}</div>
				</div>
			)}
		</div>
	);
};

export default SpinSection;
