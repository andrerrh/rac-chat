import type { Request, Response } from "express";
import express from "express";
import multer from 'multer';
import path from "path";

import UserRepository from "../src/repositories/UserRepository.ts";
import { hashPassword } from "../utils/bcryptPass.ts";

const router = express.Router();
const uploadDest = path.join(process.cwd(), 'uploads/avatar');
const upload = multer({ dest: uploadDest });

router.post("/register", upload.single('avatar'), async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const hashedPassword = await hashPassword(password);
	const avatarPath = req.file?.filename ? `/uploads/avatar/${req.file.filename}` : null;

	const userData = { username, password: hashedPassword, avatarPath };

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

router.get("/:userId", async (req: Request, res: Response) => {
	const response = await UserRepository.getUserById(req.params.userId);

	if (response.success) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
})

router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const response = await UserRepository.getUserByUsername(username);
	if (response.success) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}

})

export default router;
