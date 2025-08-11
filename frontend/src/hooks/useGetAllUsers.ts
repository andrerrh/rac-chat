import type { GetAllUsersResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

const getAllUsers = async(): Promise<GetAllUsersResponse> => {
	const response = await fetch(`${apiUrl}/user/all`, {
		method: "GET",
	})

	const data = await response.json();
	return data;
}

const useGetAllUsers = () => {
	return useQuery({
		queryFn: getAllUsers,
		queryKey: ['all_users']
	})
}

export { useGetAllUsers };
