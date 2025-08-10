import sequelize from './src/db.ts';
import User from './src/models/User.ts';
import Message from './src/models/Message.ts'

sequelize.sync()

// import express from "express";
// import cors from "cors";
//
// import userRoute from './api/user.ts';
//
// const app = express();
//
// app.use(cors());
//
// app.use('/user', userRoute);
// app.listen(3000, () => {
// 	console.log("Listening")
// })
