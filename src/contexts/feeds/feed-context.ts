import type { FEEDCONTEXT_T } from "@/types/feed";
import { createContext, useContext } from "react";

export const FeedContext = createContext<FEEDCONTEXT_T | undefined>(undefined);

export function useFeed() {
	const context = useContext(FeedContext);
	if (!context) {
		throw new Error("useFeed must be used within a FeedProvider");
	}
	return context;
}
