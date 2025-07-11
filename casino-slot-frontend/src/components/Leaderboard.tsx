import type { FC } from "react";

interface LeaderboardProps {
	leaderboard: { username: string; netWin: number }[];
	fromCache: boolean;
	days: number;
	setDays: (d: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Leaderboard: FC<LeaderboardProps> = ({ leaderboard, fromCache, days, setDays }) => (
	<div className="mt-8">
		<div className="flex justify-between items-center mb-2">
			<h3 className="text-lg font-semibold">
				🏆 Leaderboard (Last {days} Day{days > 1 ? "s" : ""})
			</h3>
			<select
				value={days}
				onChange={(e) => setDays(Number(e.target.value))}
				className="border px-2 py-1 rounded text-sm"
			>
				<option value={1}>1 Day</option>
				<option value={3}>3 Days</option>
				<option value={7}>7 Days</option>
				<option value={14}>14 Days</option>
				<option value={30}>30 Days</option>
			</select>
		</div>

		{leaderboard.length === 0 ? (
			<div>No winners yet!</div>
		) : (
			<div className="space-y-2">
				{leaderboard.map((user, i) => (
					<div key={i} className="p-2 border rounded flex justify-between bg-yellow-50">
						<span>
							#{i + 1} {user.username}
						</span>
						<span className="font-semibold text-green-600">₹{user.netWin}</span>
					</div>
				))}
			</div>
		)}

		{/* <div className="text-xs text-gray-500 mt-2">{fromCache ? "⚡ Served from Redis cache" : "🔄 Fresh data"}</div> */}
		<div className="text-xs text-gray-500 mt-2">{fromCache ? "" : ""}</div>
	</div>
);

export default Leaderboard;
