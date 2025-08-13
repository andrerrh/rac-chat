import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.ts';
import User from './User.ts';

class Message extends Model {
	id!: number;
	sender_id!: number;
	receiver_id!: number;
	message!: string;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

Message.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		sender_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		receiver_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		message: {
			type: new DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		tableName: 'messages',
		sequelize,
	}
)

export default Message;
