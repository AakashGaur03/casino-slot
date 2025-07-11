import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import spinRoutes from "./routes/spinRoutes";
import userRoutes from "./routes/userRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import authMiddleware from "./middleware/authMiddleware";
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);
app.use(express.json());

app.get("/api/ping", (_, res) => {
	res.send("pong 🏓");
});
app.get("/api/protected", authMiddleware, (req, res) => {
	res.json({ message: "You are authorized", user: req.user });
});
app.use("/api/auth", authRoutes);
app.use("/api/spin", spinRoutes);
app.use("/api", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use((req, res) => {
	res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
