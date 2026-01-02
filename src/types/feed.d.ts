export type FEEDCONTEXT_T = {
	feeds: FEED_T[];
	usernames: string[];
	isLoading: boolean;
	error: any;

	filterUsername: string;
	limit: number;
	searchText: string;

	setFilterUsername: (value: string) => void;
	setLimit: (value: number) => void;
	setSearch: (value: string) => void;

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
};

export interface EDIT_POST_MODAL_PROPS {
	feed: FEED_T;
	onUpdate?: (updatedText: string) => void; // optional callback after update
}
