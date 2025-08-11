import { z } from "zod";

export const registerSchema = z.object({
	username: z.string().min(5, {
		message: "O nome de usuário deve conter ao menos 5 letras",
	}),
	password: z
		.string()
		.min(5, {
			message: "A senha deve conter mais que 5 caracteres"
		})
		.refine((password) => /[A-Z]/.test(password), {
			message: "A senha deve conter letras maiusculas"
		})
		.refine((password) => /[0-9]/.test(password), {
			message: "A senha deve conter números"
		})
		.refine((password) => /[`!@#$%^&*()_\-+=§\[\]{};':"\\|,.<>\/?~ ]/.test(password), {
			message: "A senha deve conter caracteres especiais",
		}),
	confirmPassword: z.string(),
	avatar: z
		.any()
		.refine(files => files?.length === 1 && ["image/png", "image/jpeg"].includes(files[0]?.type), {
			message: "O avatar deve ser um arquivo PNG ou JPEG"
		})
		.refine(files => files?.[0]?.size <= 5 * 1024 * 1024, {
			message: "O arquivo deve ter no máximo 5MB"
		}),
})
	.check(z.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não são iguais",
		path: ["confirmPassword"]
	}))

export type RegisterInput = z.infer<typeof registerSchema>;
