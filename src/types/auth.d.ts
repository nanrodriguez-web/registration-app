export type SignIn_T = {
	username: string;
	password: string;
};

export type AUTHENTICATION_T = {
	middleware?: "guest" | "auth" | null;
	redirectIfAuthenticated?: string | null;
};
