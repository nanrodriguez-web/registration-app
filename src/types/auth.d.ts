export type SIGNIN_T = {
	username: string;
	password: string;
};

export type SIGNUP_T = {
	username: string;
	password: string;
	firstname: string;
	lastname: string;
};

export type AUTHENTICATION_T = {
	middleware?: "guest" | "auth" | null;
	redirectIfAuthenticated?: string | null;
};

export type AUTH_ERROR_T = {
	code?: string;
	message?: string;
};

export type SET_AUTH_ERROR_T = {
	username?: string;
	password?: string;
};
