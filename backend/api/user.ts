import type { Request, Response } from "express";
import express from "express";
import multer from 'multer';
import path from "path";

import UserRepository from "../src/repositories/UserRepository.ts";

const router = express.Router();
const uploadDest = path.join(process.cwd(), 'uploads/avatar');
const upload = multer({ dest: uploadDest });

router.post("/register", upload.single('avatar'), async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const avatarPath = `/uploads/avatar/${req.file?.filename}` || "";

	const userData = { username, password, avatarPath };

	const response = await UserRepository.createUser(userData);
	if (response.success) {
		res.status(201).json(response);
	} else {
		res.status(500).json(response);
	}
})

router.get("/all", async (req: Request, res: Response) => {
	const response = await UserRepository.getAllUsers();

	if (response.success) {
		res.status(200).json(response);
	} else {
		res.status(500).json(response);
	}
})

router.get("/:userId", async(req: Request, res: Response) => {
	const response = await UserRepository.getUser(req.params.userId);

	if(response.success) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
})

export default router;
