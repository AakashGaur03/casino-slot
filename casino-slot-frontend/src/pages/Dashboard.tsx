import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardHeader from "../components/DashboardHeader";
import BalanceCard from "../components/BalanceCard";
import SpinSection from "../components/SpinSection";
import Leaderboard from "../components/Leaderboard";
import TransactionHistory from "../components/TransactionHistory";
import type { Transaction } from "../types";

const Dashboard = () => {
	const [balance, setBalance] = useState(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [leaderboard, setLeaderboard] = useState<{ username: string; netWin: number }[]>([]);
	const [fromCache, setFromCache] = useState(false);

	const fetchBalance = async () => {
		const res = await API.get("/balance");
		setBalance(res.data.balance);
	};

	const fetchTransactions = async (p = 1) => {
		const res = await API.get(`/transactions?page=${p}&limit=5`);
		setTransactions(res.data.transactions);
		setPage(res.data.page);
		setTotalPages(res.data.totalPages);
	};

	const fetchLeaderboard = async () => {
		const res = await API.get("/leaderboard?days=7");
		setLeaderboard(res.data.data);
		setFromCache(res.data.fromCache);
	};

	useEffect(() => {
		fetchBalance();
		fetchTransactions();
		fetchLeaderboard();
	}, []);

	return (
		<div className="p-4 max-w-md mx-auto space-y-6">
			<DashboardHeader />
			<BalanceCard balance={balance} />
			<SpinSection onSpin={() => fetchTransactions()} refreshBalance={fetchBalance} />
			<Leaderboard leaderboard={leaderboard} fromCache={fromCache} />
			<TransactionHistory
				transactions={transactions}
				page={page}
				totalPages={totalPages}
				onPageChange={fetchTransactions}
			/>
		</div>
	);
};

export default Dashboard;
