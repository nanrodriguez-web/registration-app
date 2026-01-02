export type FEEDCONTEXT_T = {
	feeds: FEED_T[];
	usernames: string[];

	isLoading: boolean;
	error: any;

	filterUsername: string;
	limit: number;
	start?: number;

	setFilterUsername: (value: string) => void;
	setLimit: (value: number) => void;
	setStart?: (value: number) => void;

	mutate: () => void;
};

export type FEED_T = {
	id: string;
	text: string;
	username: string;
	createdAt: string;
	updatedAt: string;
	user: User;
};

export type GET_FEED_PARAMS_T = {
	limit?: number;
	start?: number;
	username?: string;
};
