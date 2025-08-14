import MessageRepository from '../src/repositories/MessageRepository.ts';
import type { SendMessageData } from '../types/message.types.ts';
import type { Server, Socket } from 'socket.io';

const onlineUsers = new Set<string>();

const socketHandler = (io: Server, socket: Socket) => {
	let userId: string | null = null;

	//Atualiza novos clientes com clientes já online
	socket.emit('online_users_list', Array.from(onlineUsers));

	socket.on('online', (id) => {
		console.log(`${socket.id} está online`);
		userId = id;
		onlineUsers.add(id);
		io.emit('user_online', id);
	})

	socket.on('disconnect', _ => {
		if(userId) {
			onlineUsers.delete(userId);
			io.emit('user_offline', userId);
		}
	})

	socket.on("join_room", async (room: string) => {
		console.log(`${socket.id} entrou na sala ${room}`)
		socket.join(room);

		const response = await MessageRepository.getMessages(room);
		if (response.success) {
			socket.emit('message_history', response.register);
		}
	});

	socket.on("send_message", (data: SendMessageData) => {
		MessageRepository.createMessage(data.userId, data.receiverId, data.message);

		io.to(data.room).emit("receive_message", {
			userId: data.userId,
			username: data.username,
			message: data.message,
			date: new Date()
		});
	})

	socket.on("typing", (room: string) => {
		socket.to(room).emit('contact_typing');
	})
}

export { socketHandler };
