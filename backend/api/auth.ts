import type { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "4b014ec07dcc2946d6e6e9ed05eb664c";

router.get("/validate", (req: Request, res: Response) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ valid: false });

	const token = authHeader.split(" ")[1];

	jwt.verify(token, JWT_SECRET, (err) => {
		if(err) return res.status(401).json({valid: false});
	
		res.json({valid: true});
	});
});

export default router;
