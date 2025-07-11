import type { Transaction } from "../types";

const TransactionHistory = ({
	transactions,
	page,
	totalPages,
	onPageChange,
}: {
	transactions: Transaction[];
	page: number;
	totalPages: number;
	onPageChange: (p: number) => void;
}) => (
	<div className="mt-8">
		<h3 className="text-lg font-semibold mb-2">📜 Transaction History</h3>

		{transactions.map((tx, i) => (
			<div key={i} className="border p-2 rounded mb-2 text-sm space-y-1 bg-white/60">
				<div>🌀 Symbols: {tx.result.join(" ")}</div>
				<div>💸 Wager: ₹{tx.wager}</div>
				<div>🏆 Win: ₹{tx.winAmount}</div>
				<div>🕒 {new Date(tx.createdAt).toLocaleString()}</div>
			</div>
		))}

		<div className="flex justify-between mt-4">
			<button className="px-3 py-1 border" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
				Prev
			</button>
			<span>
				Page {page} of {totalPages}
			</span>
			<button className="px-3 py-1 border" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
				Next
			</button>
		</div>
	</div>
);

export default TransactionHistory;
