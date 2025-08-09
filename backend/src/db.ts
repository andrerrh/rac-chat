import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME || 'db_main',
	process.env.DB_USER || 'user',
	process.env.DB_PASSWORD || 'password',
	{
		host: process.env.DB_HOST || 'db',
		dialect: 'postgres',
		logging: false,
	}
)

try {
	await sequelize.authenticate();
	console.log('Connected successfully to DB');
} catch {
	console.log('Error establishing connection with DB')
}

export default sequelize
