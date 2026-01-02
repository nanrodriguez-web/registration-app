import { useFeed } from "@/contexts/feeds/feed-context";

export default function FeedPagination() {
	const { start, limit, setStart, feeds } = useFeed();

	return (
		<div>
			<button disabled={start === 0} onClick={() => setStart(start - limit)}>
				Previous
			</button>
			<button
				disabled={feeds.length < limit}
				onClick={() => setStart(start + limit)}>
				Next
			</button>
		</div>
	);
}
