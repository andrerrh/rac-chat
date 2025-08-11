import type { LoginResponse } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const apiUrl = import.meta.env.VITE_API_URL;

const login = async (userData: FormData): Promise<LoginResponse> => {
	const response = await fetch(`${apiUrl}/user/login`, {
		method: "POST",
		body: userData
	})

	const data: LoginResponse = await response.json();
	if (!data.success) throw new Error(data.message);
	return data;
}

const useLogin = () => {
	return useMutation<LoginResponse, Error, FormData>({
		mutationFn: login,
		onSuccess: (data) => {
			toast.success(data.message);
		},
		onError: (data) => {
			toast.error(data.message || "Erro ao logar usuário", {
				style: { color:"red"}
			});
		}
	})
}

export { useLogin };
