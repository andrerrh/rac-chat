import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (error) {
		console.error("Erro ao gerar o hash da senha:", error);
		throw new Error("Erro ao gerar o hash da senha:");
	}
};

const comparePassword = async (password: string, hash: string): Promise<string> => {
	try {
		return await bcrypt.compare(password, hash);
	} catch (error) {
		console.error("Erro ao comparar senhas", error);
		throw new Error("Senhas não coincidem ");
	}
}

export { hashPassword, comparePassword };
