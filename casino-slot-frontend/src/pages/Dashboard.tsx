import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardHeader from "../components/DashboardHeader";
import BalanceCard from "../components/BalanceCard";
import SpinSection from "../components/SpinSection";
import Leaderboard from "../components/Leaderboard";
import TransactionHistory from "../components/TransactionHistory";
import type { Transaction } from "../types";
import { handleApiError } from "../utils/handleApiError";

const Dashboard = () => {
	const [balance, setBalance] = useState(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [leaderboard, setLeaderboard] = useState<{ username: string; netWin: number }[]>([]);
	const [fromCache, setFromCache] = useState(false);
	const [days, setDays] = useState(7);

	const fetchBalance = async () => {
		try {
			const res = await API.get("/balance");
			setBalance(res.data.balance);
		} catch (err) {
			handleApiError(err, "Failed to fetch balance");
		}
	};

	const fetchTransactions = async (p = 1) => {
		try {
			const res = await API.get(`/transactions?page=${p}&limit=5`);
			setTransactions(res.data.transactions);
			setPage(res.data.page);
			setTotalPages(res.data.totalPages);
		} catch (err) {
			handleApiError(err, "Failed to fetch transactions");
		}
	};

	const fetchLeaderboard = async (d = days) => {
		try {
			const res = await API.get(`/leaderboard?days=${d}`);
			setLeaderboard(res.data.data);
			setFromCache(res.data.fromCache);
		} catch (err) {
			handleApiError(err, "Failed to fetch leaderboard");
		}
	};

	useEffect(() => {
		fetchLeaderboard(days);
	}, [days]);

	useEffect(() => {
		fetchBalance();
		fetchTransactions();
	}, []);

	return (
		<div className="p-4 max-w-md mx-auto space-y-6">
			<DashboardHeader />
			<BalanceCard balance={balance} />
			<SpinSection onSpin={() => fetchTransactions()} refreshBalance={fetchBalance} />
			<Leaderboard leaderboard={leaderboard} fromCache={fromCache} days={days} setDays={setDays} />
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
