import fs from 'fs';
import path from 'path';
import express from "express";
import cors from "cors";
import { Server } from 'socket.io';

import sequelize from './src/db.ts';
import userRoute from './api/user.ts';
import authRoute from './api/auth.ts';
import MessageRepository from './src/repositories/MessageRepository.ts';
import User from './src/models/User.ts';
import Message from './src/models/Message.ts';
import type { SendMessageData } from './types/message.types.ts';

sequelize.sync();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;

const expressServer = app.listen(PORT, () => {
	console.log(`Aberto na porta ${PORT}`);
})

const io = new Server(expressServer, {
	cors: {
		origin: "http://localhost:5173"
	}
});

//Cria a relação de 1 para muitos de usuarios com mensagens
User.hasMany(Message, {foreignKey: "sender_id", as: "sentMessages"});
User.hasMany(Message, {foreignKey: "receiver_id", as: "receivedMessages"});
Message.belongsTo(User, {foreignKey: "sender_id", as: "sender"});
Message.belongsTo(User, {foreignKey: "receiver_id", as: "receiver"});

io.on('connection', socket => {
	console.log(`${socket.id} está online`);

	socket.on("join_room", async (room: string) => {
		console.log(`${socket.id} entrou na sala ${room}`)
		socket.join(room);

		const response = await MessageRepository.getMessages(room);
		console.log(response)
		if (response.success) {
			io.emit('message_history', response.register);
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
})


//Cria o caminho para salvar os avatares caso não exista
const uploadDest = path.join(process.cwd(), 'uploads/avatar');
if (!fs.existsSync(uploadDest)) {
	fs.mkdirSync(uploadDest, { recursive: true });
}

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/user', userRoute);
app.use('/auth', authRoute)

