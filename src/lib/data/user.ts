import api from "@/lib/api";
import type { USER_T } from "@/types/user";
import Cookies from "js-cookie";

export const getUser = async (
	username?: string | null
): Promise<USER_T | null> => {
	const path = username ? `/api/user/${username}` : "/api/user";
	const token = Cookies.get("auth");

	console.log(username);

	if (!token) return null; // no auth token, cannot fetch user

	try {
		const response = await api.get<USER_T>(path, {
			headers: { authorization: token },
		});
		return response.data;
	} catch (err: any) {
		console.error("Failed to fetch user:", err);
		return null;
	}
};
