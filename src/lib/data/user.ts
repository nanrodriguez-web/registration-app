import api from "@/lib/api";
import Cookies from "js-cookie";

export const getUser = async () => {
	try {
		const response = await api.get("/api/user", {
			headers: {
				authorization: `${Cookies.get("auth")}`,
			},
		});
		return response.data;
	} catch (error) {
		// If unauthorized, return null so SWR knows user is not logged in
		return null;
	}
};
