import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.ts';
import Message from './Message.ts';

class User extends Model {
	id!: number;
	name!: string;
	password!: string;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: new DataTypes.STRING(128),
			unique: true,
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		avatarPath: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'users',
		sequelize,
	}
)

export default User;
