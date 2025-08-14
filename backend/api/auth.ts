import type { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/validate", (req: Request, res: Response) => {
	if (!JWT_SECRET) return res.status(500).json({ valid: false });

	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ valid: false });

	const token = authHeader.split(" ")[1];

	jwt.verify(token, JWT_SECRET, (err) => {
		if (err) return res.status(401).json({ valid: false });

		res.json({ valid: true });
	});
});

export default router;
