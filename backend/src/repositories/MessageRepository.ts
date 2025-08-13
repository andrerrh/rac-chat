import { Op } from 'sequelize';
import Message from '../models/Message.ts';
import User from '../models/User.ts';

const createMessage = async (senderId: string, receiverId: string, message: string) => {
	try {
		await Message.create({
			sender_id: senderId,
			receiver_id: receiverId,
			message: message,
		});

		return {
			success: true,
		}
	} catch (error: any) {
		console.error("Erro ao salvar mensagem:", error);

		return {
			success: false,
		}
	}
}

const getMessages = async (roomId: string) => {

	const [id1, id2] = roomId.split("_");

	try {
		const response = await Message.findAll({
			where: {
				[Op.or]: [
					{ sender_id: id1, receiver_id: id2 },
					{ sender_id: id2, receiver_id: id1 }]
			},
			attributes: [ "message", "createdAt"],
			include: [
				{
					model: User,
					as: "sender",
					attributes: ["id", "username"],
				},
				{
					model: User,
					as: "receiver",
					attributes: ["id", "username"],
				},
			],
			order: [["createdAt", "ASC"]]
		})

		return {
			success: true,
			register: response,
		}
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
		}
	}
}

export default {
	createMessage,
	getMessages,
}
