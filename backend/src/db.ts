import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`)

try {
	await sequelize.authenticate();
	console.log('Connected successfully to DB');
} catch(error) {
	console.log('Error establishing connection with DB', error);
}

export default sequelize
