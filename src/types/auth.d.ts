export interface SIGNIN_T {
	username: string;
	password: string;
}

export interface SIGNUP_T extends SIGNIN_T {
	firstname: string;
	lastname: string;
}

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
