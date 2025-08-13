import type { LoginResponse, Login } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const apiUrl = import.meta.env.VITE_API_URL;

const login = async (userData: Login): Promise<LoginResponse> => {
	const response = await fetch(`${apiUrl}/user/login`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData),
	})

	const data: LoginResponse = await response.json();
	console.log(data)
	if (!data.register.success) throw new Error(data.register.message);
	return data;
}

const useLogin = () => {
	return useMutation<LoginResponse, Error, Login>({
		mutationFn: login,
		onSuccess: (data) => {
			toast.success(data.register.message);
			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.register.user.username);
			localStorage.setItem('avatar', data.register.user.avatarPath);
		},
		onError: (data) => {
			toast.error(data.message || "Erro ao logar usuário", {
				style: { color: "red" }
			});
		}
	})
}

export { useLogin };
