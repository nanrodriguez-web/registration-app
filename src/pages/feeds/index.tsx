import CreatePost from "@/components/ui/feeds/create-post";
import FeedItem from "@/components/ui/feeds/feed-item";
import FeedsSearch from "@/components/ui/feeds/feed-search";
import FeedsFilter from "@/components/ui/feeds/feeds-filter";
import FeedItemSkeleton from "@/components/ui/loader/feed-item-skeleton";
import { useFeed } from "@/contexts/feeds/feed-context";
import { FeedProvider } from "@/contexts/feeds/feed-context-provider";
import FeedLayout from "@/layout/feed-layout";

function FeedsContent() {
	const { feeds, isLoading, error } = useFeed();

	return (
		<>
			<CreatePost />

			<div className='flex justify-between items-center my-2'>
				<FeedsSearch />
				<FeedsFilter />
			</div>

			<div className='space-y-4'>
				{isLoading &&
					Array.from({ length: 3 }).map((_, i) => (
						<FeedItemSkeleton key={i} />
					))}

				{error && (
					<p className='text-center text-red-500'>Failed to load feeds.</p>
				)}

				{feeds.map((feed) => (
					<FeedItem key={feed.id} feed={feed} interactive />
				))}

				{!isLoading && feeds.length === 0 && (
					<p className='text-center text-muted-foreground'>
						No feeds found.
					</p>
				)}
			</div>
		</>
	);
}

export default function Feeds() {
	return (
		<FeedLayout>
			<FeedProvider>
				<FeedsContent />
			</FeedProvider>
		</FeedLayout>
	);
}
