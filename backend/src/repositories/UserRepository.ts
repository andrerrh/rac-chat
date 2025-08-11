import User from '../models/User.ts';
import type { UserData, UserCreateResponse } from "../../types/user.types.ts";
import { UniqueConstraintError } from 'sequelize';

const createUser = async (data: UserData): Promise<UserCreateResponse> => {
	try {
		const response = await User.create({
			username: data.username,
			password: data.password,
			avatarPath: data.avatarPath
		});

		return {
			success: true,
			message: "Usuário registrado com sucesso",
			createdUser: {
				id: response.dataValues.id,
				username: response.dataValues.username,
				avatarPath: response.dataValues.avatarPath,
				createdAt: response.dataValues.createdAt,
			}
		}
	} catch (error: any) {
		if (error instanceof UniqueConstraintError) {
			return {
				success: false,
				message: "Nome de usuário já existe",
			}
		}
		console.error("Erro ao criar usuário", error);

		return {
			success: false,
			message: "Erro ao criar usuário",
		}
	}

}

const getAllUsers = async () => {
	try {
		const response = await User.findAll({
			attributes: ["id", "username", "avatarPath"]
		});

		return {
			success: true,
			message: "Usuários listados com sucesso",
			users: response,
		}
	} catch (error: any) {
		console.error("Erro ao listar usuários", error);

		return {
			success: false,
			message: "Erro ao listar usuários",
		}
	}
}

const getUserById = async (userId: string) => {
	try {
		const response = await User.findByPk(userId, {
			attributes: ["id", "username", "avatarPath"],
		})

		if (!response) throw 404;

		return {
			success: true,
			message: "Usuário encontrado",
			user: response,
		}
	} catch (error: any) {
		console.error("Erro ao listar usuário");

		return {
			success: false,
			message: "Erro ao listar usuário",
		}
	}
}

const getUserByUsername = async (username: string) => {
	try {
		const response = await User.findOne({
			where: { username },
			attributes: ["id", "username", "avatarPath"],
		})
		if (!response) throw 404;

		return {
			success: true,
			message: "Usuário encontrado",
			user: response,
		}

	} catch (error: any) {
		console.log("Erro ao listar usuário")

		return {
			success: false,
			message: "Erro ao listar usuário",
		}
	}
}

export default {
	createUser,
	getAllUsers,
	getUserById,
	getUserByUsername,
}
