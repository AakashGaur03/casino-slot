import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	userId: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token provided" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid or expired token: Please login again" });
	}
};

export default authMiddleware;
