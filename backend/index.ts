import fs from 'fs';
import path from 'path';
import express from "express";
import cors from "cors";

import sequelize from './src/db.ts';
import User from './src/models/User.ts';
import Message from './src/models/Message.ts'
import userRoute from './api/user.ts';

sequelize.sync();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uploadDest = path.join(process.cwd(), 'uploads/avatar');
//Cria o caminho para salvar os avatares caso não exista
if (!fs.existsSync(uploadDest)) {
	fs.mkdirSync(uploadDest, { recursive: true });
}

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/user', userRoute);

app.listen(3000, () => {
	console.log("Listening on port 3000");
})
