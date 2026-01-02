import { FeedContext } from "@/contexts/feeds/feed-context";
import { getFeeds } from "@/lib/data/feeds";
import type { FEED_T, GET_FEED_PARAMS_T } from "@/types/feed";
import { useMemo, useState } from "react";
import useSWR from "swr";

export function FeedProvider({ children }: { children: React.ReactNode }) {
	const [filterUsername, setFilterUsernameState] = useState<string>("all");
	const [limit, setLimitState] = useState<number>(20);
	const [searchText, setSearchText] = useState<string>(""); // <-- new

	const setFilterUsername = (username: string) =>
		setFilterUsernameState(username);
	const setLimit = (newLimit: number) => setLimitState(newLimit);
	const setSearch = (text: string) => setSearchText(text); // <-- setter

	const swrKey: [string, GET_FEED_PARAMS_T] = ["feeds", { limit }];

	const {
		data: feeds,
		error,
		isLoading,
		mutate,
	} = useSWR(swrKey, ([_, params]: [string, GET_FEED_PARAMS_T]) =>
		getFeeds(params)
	);

	const usernames: string[] = useMemo(() => {
		if (!feeds) return [];
		return Array.from(new Set(feeds.map((f: FEED_T) => f.username)));
	}, [feeds]);

	const filteredFeeds = useMemo(() => {
		if (!feeds) return [];

		let list = feeds;

		// filter by username
		if (filterUsername !== "all") {
			list = list.filter((f: FEED_T) => f.username === filterUsername);
		}

		// filter by search text
		if (searchText.trim() !== "") {
			const lower = searchText.toLowerCase();
			list = list.filter((f: FEED_T) =>
				f.text.toLowerCase().includes(lower)
			);
		}

		return list;
	}, [feeds, filterUsername, searchText]);

	const value = {
		feeds: filteredFeeds ?? [],
		usernames,
		isLoading,
		error,
		filterUsername,
		limit,
		searchText, // <-- expose search text
		setFilterUsername,
		setLimit,
		setSearch, // <-- expose search setter
		mutate,
	};

	return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
