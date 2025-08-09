import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.ts';

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
		name: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		}
	},
	{
	tableName: 'users',
	sequelize,
	}
)

export default User;
