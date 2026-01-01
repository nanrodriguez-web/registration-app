import api from "@/lib/api";
export const getFeeds = async () => {
	const response = await api.get("/api/feed");

	return response.data;
};

export const createPost = async (text: string) => {
	const response = await api.post("/api/feed/post", {
		text,
	});

	return response.data;
};
