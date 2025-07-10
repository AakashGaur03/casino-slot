type Symbol = {
	symbol: string;
	weight: number;
	payout: number;
};

const symbols: Symbol[] = [
	{ symbol: "🍒", weight: 0.4, payout: 2 },
	{ symbol: "🍋", weight: 0.3, payout: 3 },
	{ symbol: "⭐", weight: 0.2, payout: 5 },
	{ symbol: "💎", weight: 0.1, payout: 10 },
];

function getRandomSymbol(): string {
	const rand = Math.random();
	let total = 0;

	for (const s of symbols) {
		total += s.weight;
		if (rand <= total) return s.symbol;
	}

	return symbols[symbols.length - 1].symbol; // fallback
}

export function spinReels(): string[] {
	return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
}

export function calculatePayout(reels: string[], wager: number): number {
	const [a, b, c] = reels;
	if (a === b && b === c) {
		const match = symbols.find((s) => s.symbol === a);
		return wager * (match?.payout ?? 0);
	} else if (a === b || b === c || a === c) {
		return wager * 0.5; // partial match
	}
	return 0;
}
