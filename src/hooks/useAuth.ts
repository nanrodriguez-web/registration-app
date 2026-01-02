import { ERROR_ENUM } from "@/enums/error-enum";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import api from "@/lib/api";
import { getUser } from "@/lib/data/user";
import useUser from "@/stores/User";
import type {
	AUTH_ERROR_T,
	AUTHENTICATION_T,
	SIGNIN_T,
	SIGNUP_T,
} from "@/types/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSWR from "swr";

interface UseAuthReturn {
	token: string | null;
	user: any;
	loadingUser: boolean;
	SignIn: (
		form: SIGNIN_T,
		setFormErrors: React.Dispatch<React.SetStateAction<AUTH_ERROR_T | null>>
	) => Promise<boolean>;
	Register: (
		form: SIGNUP_T,
		setFormErrors: React.Dispatch<React.SetStateAction<AUTH_ERROR_T | null>>
	) => Promise<boolean>;
	logout: () => Promise<void>;
	loggingOut: boolean;
}

export default function useAuth({
	middleware = null,
	redirectIfAuthenticated = null,
}: AUTHENTICATION_T): UseAuthReturn {
	const navigate = useNavigate();
	const { handleError } = useErrorHandling();

	const [loggingOut, setLoggingOut] = useState<boolean>(false);

	const { setUser } = useUser();

	/**
	 * Token state
	 */
	const [token, setToken] = useState<string | null>(
		() => Cookies.get("auth") || null
	);

	/**
	 * SWR: only fetch user if token exists
	 */
	const {
		data: user,
		isLoading: loadingUser,
		mutate,
	} = useSWR(token ? "/api/user" : null, getUser, {
		revalidateOnFocus: false,
	});

	/**
	 * Sign in
	 */
	const SignIn = async (
		form: SIGNIN_T,
		setFormErrors: React.Dispatch<React.SetStateAction<AUTH_ERROR_T | null>>
	): Promise<boolean> => {
		try {
			const { data } = await api.post<{ token: string }>(
				"/api/account/login",
				form
			);

			Cookies.set("auth", data.token, { path: "/" });
			setToken(data.token);

			navigate("/feeds");
			return true;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const responseData = error.response?.data;

				/**
				 * Explicit 401 handling
				 */
				if (status === 401) {
					setFormErrors({
						code: ERROR_ENUM.unauthorized,
						message: "Invalid email or password",
					});
					return false;
				}

				/**
				 * Other API errors
				 */
				handleError(
					responseData?.code,
					responseData?.message,
					setFormErrors
				);

				return false;
			}

			// Non-Axios error (unexpected)
			toast.error("Something went wrong. Please try again.");
			return false;
		}
	};

	/**
	 * Sign in
	 */
	const Register = async (
		form: SIGNUP_T,
		setFormErrors: React.Dispatch<React.SetStateAction<AUTH_ERROR_T | null>>
	): Promise<boolean> => {
		try {
			const response = await api.post<{ token: string }>(
				"/api/account/create",
				form
			);

			const newToken = response.data.token;

			Cookies.set("auth", newToken, { path: "/" });
			setToken(newToken);

			navigate("/feeds");

			return true;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const responseData = error.response?.data;

				/**
				 * Explicit 401 handling
				 */
				if (status === 401) {
					setFormErrors({
						code: ERROR_ENUM.unauthorized,
						message: "Invalid email or password",
					});
					return false;
				}

				/**
				 * Other API errors
				 */
				handleError(
					responseData?.code,
					responseData?.message,
					setFormErrors
				);

				return false;
			}

			// Non-Axios error (unexpected)
			toast.error("Something went wrong. Please try again.");
			return false;
		}
	};

	/**
	 * Logout
	 */
	const logout = async (): Promise<void> => {
		setLoggingOut(true);
		try {
			await api.post("/api/account/logout");
			Cookies.remove("auth");
			setToken(null);

			// Clear user immediately
			await mutate(null, false);

			navigate("/");
		} catch {
			// ignore backend failure
			toast.error("Something went wrong on logout");
		} finally {
			setLoggingOut(false);
		}
	};

	/**
	 * Redirect logic
	 */
	useEffect(() => {
		if (loadingUser) return;

		// Guest page but already logged in
		if (middleware === "guest" && user && redirectIfAuthenticated) {
			navigate(redirectIfAuthenticated);
		}

		// Protected page but not logged in
		if (middleware === "auth" && !user) {
			window.location.replace("/");
		}

		if (user) {
			setUser(user);
		}
	}, [middleware, redirectIfAuthenticated, user, loadingUser, navigate]);

	return {
		token,
		user,
		loadingUser,
		SignIn,
		logout,
		Register,
		loggingOut,
	};
}
