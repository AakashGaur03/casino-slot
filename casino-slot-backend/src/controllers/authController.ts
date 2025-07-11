import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
	console.log("first");
	const { username, password } = req.body;

	try {
		const existing = await User.findOne({ username });
		if (existing) return res.status(400).json({ message: "Username already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ username, password: hashedPassword });

		res.status(201).json({ message: "User created", userId: user._id });
	} catch (err) {
		res.status(500).json({ message: "Registration failed", error: err });
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ message: "User not found" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

		res.status(200).json({ token, username });
	} catch (err) {
		res.status(500).json({ message: "Login failed", error: err });
	}
};
