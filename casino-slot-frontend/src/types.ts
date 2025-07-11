// src/types.ts

export interface Transaction {
	_id: string;
	userId: string;
	wager: number;
	result: string[];
	winAmount: number;
	createdAt: string;
	updatedAt: string;
}

export interface LeaderboardEntry {
	username: string;
	netWin: number;
}
