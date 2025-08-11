import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

//Espera inicialização do banco antes de conectar
const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

await delay(2000);

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`)


try {
	await sequelize.authenticate();
	console.log('Connected successfully to DB');
} catch(error) {
	console.log('Error establishing connection with DB', error);
}

export default sequelize
