import { FeedContext } from "@/contexts/feeds/feed-context";
import { getFeeds } from "@/lib/data/feeds";
import type { FEED_T, GET_FEED_PARAMS_T } from "@/types/feed";
import { useMemo, useState } from "react";
import useSWR from "swr";

export function FeedProvider({ children }: { children: React.ReactNode }) {
	const [filterUsername, setFilterUsernameState] = useState<string>("all");
	const [limit, setLimitState] = useState<number>(20);
	// const [start, setStart] = useState<number>(1);

	const setFilterUsername = (username: string) => {
		setFilterUsernameState(username);
		// setStart(1); // reset pagination
	};

	const setLimit = (newLimit: number) => {
		setLimitState(newLimit);
		// setStart(1); // reset pagination
	};

	const swrKey: [string, GET_FEED_PARAMS_T] = [
		"feeds",
		{
			limit,
			// start,
			username: filterUsername !== "all" ? filterUsername : undefined,
		},
	];

	const {
		data: feeds,
		error,
		isLoading,
		mutate,
	} = useSWR(swrKey, ([_, params]: [string, GET_FEED_PARAMS_T]) =>
		getFeeds(params)
	);

	// --- Unique usernames for filter ---
	const usernames: string[] = useMemo(() => {
		if (!feeds) return [];
		return Array.from(new Set(feeds.map((f: FEED_T) => f.username)));
	}, [feeds]);

	// --- Context value ---
	const value = {
		feeds: feeds ?? [],
		usernames,
		isLoading,
		error,

		filterUsername,
		limit,
		// start,

		setFilterUsername,
		setLimit,
		// setStart,

		mutate,
	};

	return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
