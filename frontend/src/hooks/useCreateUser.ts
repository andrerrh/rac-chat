import type { UserCreateResponse } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const apiUrl = import.meta.env.VITE_API_URL;

const createUser = async (userData: FormData): Promise<UserCreateResponse> => {
	const response = await fetch(`${apiUrl}/user/register`, {
		method: "POST",
		body: userData
	})

	const data: UserCreateResponse = await response.json();
	if (!data.success) throw new Error(data.message);
	return data;
}


const useCreateUser = () => {
	const navigate = useNavigate();
	return useMutation<UserCreateResponse, Error, FormData>({
		mutationFn: createUser,
		onSuccess: (data) => {
			toast.success(data.message);
			navigate('/login');
		},
		onError: (data) => {
			toast.error(data.message || "Ocorreu um erro ao criar o usuário", {
				style: { color: "red" }
			});
		}
	})
}

export { useCreateUser };
