import config from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("X-TOKEN");

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["X-TOKEN"] = token || "";

const api = axios.create({
	baseURL: config.backend_url,
	withCredentials: true,
});

export default api;
