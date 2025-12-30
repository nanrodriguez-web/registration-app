import type { AUTHENTICATION_T } from "@/types/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth({
	middleware = null,
	redirectIfAuthenticated = null,
}: AUTHENTICATION_T) {
	const navigate = useNavigate();

	// check if the there is a token in cookies
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("X-TOKEN="))
		?.split("=")[1];

	useEffect(() => {
		if (middleware === "guest" && token && redirectIfAuthenticated) {
			navigate(redirectIfAuthenticated);
		}
	}, [token]);

	const SignIn = () => {};

	return {
		token,
	};
}

export function useSession() {}
export function useSignIn() {}
export function useLogout() {}
export function useRegister() {}
