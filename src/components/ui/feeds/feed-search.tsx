import { Input } from "@/components/ui/input";
import { useFeed } from "@/contexts/feeds/feed-context";

export default function FeedsSearch() {
	const { searchText, setSearch } = useFeed();

	return (
		<div>
			{/* <Label htmlFor='search' className='mb-1 block'>
				Search Feeds
			</Label> */}
			<Input
				id='search'
				placeholder='Search posts...'
				value={searchText}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
}
