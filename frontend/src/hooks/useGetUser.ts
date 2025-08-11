import type { getUserResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

const getUserById = async (userId: string): Promise<getUserResponse> => {
	const response = await fetch(`${apiUrl}/user/${userId}`, {
		method: "GET",
	})

	const data: getUserResponse = await response.json();
	if (!data.success) throw new Error(data.message);
	return data;
}

const useGetUserById = (userId: string) => {
	return useQuery<getUserResponse, Error, getUserResponse>({
		queryFn: () => getUserById(userId),
		queryKey: ['user', userId],
	})
}

export { useGetUserById };
