import api from "@/lib/api";
export const getFeeds = async () => {
	const response = await api.get("/api/feed");

	return response.data;
};
