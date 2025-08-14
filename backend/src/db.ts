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
	console.log('Conectado com sucesso ao banco de dados');
} catch(error) {
	console.error('Erro ao se conectar com o banco de dados: ', error);
}

export default sequelize
