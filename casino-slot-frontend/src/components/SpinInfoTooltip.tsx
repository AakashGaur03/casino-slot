import { useState } from "react";

const SpinInfoTooltip = () => {
	const [showTooltip, setShowTooltip] = useState(false);

	const toggleTooltip = () => {
		setShowTooltip((prev) => !prev);
	};

	const baseClass =
		"absolute bg-white text-black text-xs border border-gray-300 rounded p-2 mt-1 w-max z-10 shadow-md -left-32";

	const tooltipClass = showTooltip ? "block" : "hidden group-hover:block";

	return (
		<div className="relative inline-block group">
			<span className="text-sm font-medium cursor-pointer" onClick={toggleTooltip}>
				ℹ️
			</span>
			<div className={`${baseClass} ${tooltipClass}`}>
				<p>💎 x3 = 10 x wager</p>
				<p>⭐ x3 = 5 x wager</p>
				<p>🍋 x3 = 3 x wager</p>
				<p>🍒 x3 = 2 x wager</p>
				<p>Any 2 = 0.5 x wager</p>
			</div>
		</div>
	);
};

export default SpinInfoTooltip;
