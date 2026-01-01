export type USER_T = {
	username: string;
	firstname: string;
	lastname: string;
	profilePic: string;
};

interface USER_STATE_I {
	user: User | null;
	setUser: (user: User) => void;
	resetUser: () => void;
}
