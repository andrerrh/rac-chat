import type { Request, Response } from "express";
import express from "express";
import multer from 'multer';
import path from "path";
import jwt from 'jsonwebtoken';

import UserRepository from "../src/repositories/UserRepository.ts";
import { hashPassword, comparePassword } from "../utils/bcryptPass.ts";
import type { LoginResponse } from "../types/user.types.ts";

const JWT_SECRET = "4b014ec07dcc2946d6e6e9ed05eb664c";

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
	const userRegister: LoginResponse = await UserRepository.getUserByUsername(username);

	if (userRegister.success) {
		const doesMatch = await comparePassword(password, userRegister.user!.password!);
		if (!doesMatch) {
			res.status(400).json({
				register: {
					success: false,
					message: "Usuário ou senha inválidos",
				}
			})
			return;
		}

		delete userRegister.user.password;

		const token = jwt.sign({ id: userRegister.user.id }, JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({
			token,
			register: userRegister
		});
	} else {
		res.status(404).json(userRegister);
	}

})

export default router;
