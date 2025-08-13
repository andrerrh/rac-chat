import fs from 'fs';
import path from 'path';
import express from "express";
import cors from "cors";
import { Server } from 'socket.io';

import sequelize from './src/db.ts';
import userRoute from './api/user.ts';
import authRoute from './api/auth.ts';

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

io.on('connection', socket => {
	console.log(`${socket.id} está online`);

	socket.on("join_room", data => {
		socket.join(data);
	});

	socket.on("send_message", data => {
		socket.to(data.room).emit("receive_message", data);
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

