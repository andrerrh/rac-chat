import User from "./User.ts";
import Message from "./Message.ts";

//Cria a relação de 1 para muitos de usuarios com mensagens
export function setupAssociations() {
	User.hasMany(Message, {foreignKey: "sender_id", as: "sentMessages"});
	User.hasMany(Message, {foreignKey: "receiver_id", as: "receivedMessages"});
	Message.belongsTo(User, {foreignKey: "sender_id", as: "sender"});
	Message.belongsTo(User, {foreignKey: "receiver_id", as: "receiver"});
}
