import api from "@/lib/api";
import type { GET_FEED_PARAMS_T } from "@/types/feed";

export const getFeeds = async (params?: GET_FEED_PARAMS_T) => {
	const { data } = await api.get("/api/feed", {
		params,
	});

	return data;
};

export const createPost = async (text: string) => {
	const response = await api.post("/api/feed/post", {
		text,
	});

	return response.data;
};

// no API for this
export const getComments = () => {};

// create a comment on a post
export const createComment = async (postId: string, text: string) => {
	if (!text) throw new Error("Comment text cannot be empty");

	const response = await api.post(`/api/feed/${postId}/comment`, { text });

	return response.data;
};
