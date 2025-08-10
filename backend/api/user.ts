import type { Request, Response } from "express";
import express from "express";
import multer from 'multer';
import path from "path";

const router = express.Router();
const uploadDest = path.join(process.cwd(), 'uploads/avatar');
const upload = multer({ dest: uploadDest });

router.post("/register", upload.single('avatar'), (req: Request, res: Response) => {
	const { username, password } = req.body;
	res.json({ username, password })
})
router.get("/info", (req: Request, res: Response) => {
	res.send()
})

export default router;
