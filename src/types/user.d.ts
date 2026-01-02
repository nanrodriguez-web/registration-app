export type USER_T = {
	username: string;
	firstName: string;
	lastName: string;
	profilePic: string;
};

export interface USER_STATE_I {
	user: USER_T | null;
	setUser: (user: USER_T) => void;
	resetUser: () => void;
}

export type PROFILE_PIC_T = {
	user: USER_T;
	setUser: (user: USER_T) => void;
	canEdit?: boolean;
};
