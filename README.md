# 🎰 Casino Slot Game - Take Home Assignment

A full-stack casino slot game built with **Node.js (TypeScript)**, **React (Vite)**, **MongoDB Atlas**, and **Upstash Redis**. The game supports JWT-based authentication, spinning logic with weighted symbols, user balance handling, transaction history, and a Redis-cached leaderboard.

---

## ✨ Features

- ✅ User registration & login with JWT
- ✅ Protected spin and balance APIs
- ✅ 3-reel slot machine with custom weighted symbols
- ✅ Payout logic based on matched symbols
- ✅ Free Spin bonus logic (1 in every 10 spins)
- ✅ Transaction history with pagination
- ✅ Leaderboard (top 10 users by net win, Redis cached)
- ✅ Modular, clean codebase with TypeScript
- ✅ Responsive and clean React UI

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Frontend**: React (Vite), TypeScript, TailwindCSS
- **Database**: MongoDB Atlas
- **Cache**: Upstash Redis
- **Auth**: JWT
- **Other**: Axios, Context API, ESLint

---

## 🛠️ Local Setup

### 🔑 Environment Variables

#### Backend `.env`

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_upstash_redis_url
REDIS_TOKEN=your_upstash_token
PORT=4000
```

#### Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:4000/api
```

---

### 📦 Install & Run

**Backend:**

```bash
cd casino-slot-backend
npm install
npm run dev
```

**Frontend:**

```bash
cd casino-slot-frontend
npm install
npm run dev
```

---

## 🧪 API Endpoints

### 🔐 Auth

- `POST /api/auth/register`
- `POST /api/auth/login` → Returns JWT

> All other endpoints require `Authorization: Bearer <token>`

---

### 🎰 Slot Game

- `POST /api/spin`
  - Body: `{ wager: number }`
  - Returns: `{ result: string[], winAmount: number, newBalance: number }`
  - Note: 1 in 10 spins is **free** (no wager deducted)

---

### 💰 Balance

- `GET /api/balance`
  - Returns user’s current balance

---

### 📜 Transactions

- `GET /api/transactions?page=1&limit=5`
  - Returns paginated transaction history

---

### 🏆 Leaderboard

- `GET /api/leaderboard?days=7`
  - Top 10 users by net win in last N days
  - Response is cached in Redis for 2 minutes

---

## 🎲 Game Mechanics

### 🎰 Symbols & Weights

```ts
[
	{ symbol: "🍒", weight: 40 },
	{ symbol: "🍋", weight: 30 },
	{ symbol: "⭐", weight: 20 },
	{ symbol: "💎", weight: 10 },
];
```

### 🏆 Payout Rules

- 3 💎 = 10x wager
- 3 ⭐ = 5x wager
- 3 🍋 = 3x wager
- 3 🍒 = 2x wager
- 2 matching symbols = 0.5x wager
- Else = 0

---

### 🎁 Free Spin Bonus

- Every **10th spin is free** (random chance)
- Wager is not deducted, but user can still win

---

## 🧑‍💻 Sample User for Testing

```json
{
	"username": "DemoUser",
	"password": "Demo123"
}
```

Use the returned JWT to test protected routes.

---

## 📁 Folder Structure

### Backend

```
casino-slot-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts
```

### Frontend

```
casino-slot-frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── types.ts
│   └── App.tsx
```

---

## ✅ Bonus Features Implemented

- ✅ Free spin logic (1 in 10 spins)
- ✅ React UI with component breakdown
- ✅ Redis leaderboard cache (2 min TTL)

## 🕹️ Backend Wake-Up Logic

To handle cold-start delays on platforms like Render:

- On first load, the frontend calls `/api/ping`.
- Until the backend is ready, the UI shows a loading state and disables login/register buttons to improve user experience.

## 📦 Scripts

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 📬 Submission

- ✅ Public GitHub repositories
- ✅ README with setup and API docs
- ✅ Sample user for testing
- ✅ All core requirements implemented

---

## 🤝 Contact

Built with ❤️ by **Aakash Gaur**  
Feel free to reach out with questions or feedback.
