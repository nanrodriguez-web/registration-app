import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useFeed } from "@/contexts/feeds/feed-context";
import { ListFilterPlus } from "lucide-react";

export default function FeedsFilter() {
	const { usernames, filterUsername, limit, setFilterUsername, setLimit } =
		useFeed();

	return (
		<Sheet>
			<SheetTrigger className='flex items-center gap-2'>
				<ListFilterPlus />
				<span className='text-sm'>Filters</span>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Feed Filters</SheetTitle>
					<SheetDescription>
						Filter feeds by username and limit the number of posts.
					</SheetDescription>
				</SheetHeader>

				<div className='space-y-6 px-3'>
					<div>
						<Label className='mb-2 block'>Filter by Username</Label>
						<Select
							value={filterUsername}
							onValueChange={setFilterUsername}>
							<SelectTrigger>
								<SelectValue placeholder='All Users' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All</SelectItem>
								{usernames.map((user) => (
									<SelectItem key={user} value={user}>
										{user}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label className='mb-2 block'>Limit Posts</Label>
						<Select
							value={limit.toString()}
							onValueChange={(val) => setLimit(Number(val))}>
							<SelectTrigger>
								<SelectValue placeholder='Limit' />
							</SelectTrigger>
							<SelectContent>
								{[5, 10, 15, 20, 25].map((num) => (
									<SelectItem key={num} value={num.toString()}>
										{num}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
