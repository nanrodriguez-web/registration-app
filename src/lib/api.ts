import config from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: config.backend_url,
	// withCredentials: true, // optional if your backend needs cookies
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
});

// Add a request interceptor to attach token dynamically
api.interceptors.request.use((config) => {
	const token = Cookies.get("auth"); // read fresh token every request
	if (token) {
		config.headers = config.headers || {};
		config.headers["authorization"] = `${token}`;
	}
	return config;
});

export default api;
