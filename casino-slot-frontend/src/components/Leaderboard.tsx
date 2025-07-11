const Leaderboard = ({
	leaderboard,
	fromCache,
}: {
	leaderboard: { username: string; netWin: number }[];
	fromCache: boolean;
}) => (
	<div className="mt-8">
		<h3 className="text-lg font-semibold mb-2">🏆 Leaderboard (Last 7 Days)</h3>

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

		<div className="text-xs text-gray-500 mt-2">{fromCache ? "⚡ Served from Redis cache" : "🔄 Fresh data"}</div>
	</div>
);

export default Leaderboard;
