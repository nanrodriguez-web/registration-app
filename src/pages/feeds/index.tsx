import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useMemo, useState } from "react";
import useSWR from "swr";

type Feed = {
	id: string;
	text: string;
	username: string;
	createdAt: string;
	updatedAt: string;
};

// Sample data
const sampleFeeds: Feed[] = [
	{
		id: "-LY04VzG1z5g-QIOu8au",
		text: "Hello There",
		username: "user2",
		createdAt: "Wed, 06 Feb 2019 04:34:35 GMT",
		updatedAt: "Wed, 06 Feb 2019 04:34:35 GMT",
	},
	{
		id: "-LY04VzG1z5g-QIOu8av",
		text: "Second post!",
		username: "user1",
		createdAt: "Thu, 07 Feb 2019 09:12:00 GMT",
		updatedAt: "Thu, 07 Feb 2019 09:12:00 GMT",
	},
	{
		id: "-LY04VzG1z5g-QIOu8aw",
		text: "Another feed example",
		username: "user2",
		createdAt: "Fri, 08 Feb 2019 11:22:10 GMT",
		updatedAt: "Fri, 08 Feb 2019 11:22:10 GMT",
	},
];

// Fake fetch function
const fetchFeeds = async (): Promise<Feed[]> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(sampleFeeds), 1000); // simulate 1s network delay
	});
};

export default function Feeds() {
	const [limit, setLimit] = useState<number>(5);
	const [filterUsername, setFilterUsername] = useState<string>("all");

	// Use SWR to fetch feeds
	const { data: feeds, error, isLoading } = useSWR("feeds", fetchFeeds);

	// Sort, filter, and limit feeds
	const sortedFeeds = useMemo(() => {
		if (!feeds) return [];

		let list = [...feeds].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);

		if (filterUsername !== "all") {
			list = list.filter((f) => f.username === filterUsername);
		}

		return list.slice(0, limit);
	}, [feeds, filterUsername, limit]);

	// Unique usernames for filter dropdown
	const usernames = useMemo(() => {
		if (!feeds) return [];
		return Array.from(new Set(feeds.map((f) => f.username)));
	}, [feeds]);

	return (
		<div className='p-6 max-w-3xl mx-auto space-y-6 min-h-screen'>
			<h1 className='text-2xl font-bold'>Feeds</h1>

			{/* Filters */}
			<div className='flex flex-col md:flex-row md:items-end md:gap-4 space-y-4 md:space-y-0'>
				<div className='flex-1'>
					<Label className='mb-2'>Filter by Username</Label>

					{isLoading ? (
						<Spinner />
					) : (
						<>
							{" "}
							<Select
								value={filterUsername}
								onValueChange={(val) => setFilterUsername(val)}>
								<SelectTrigger>
									<SelectValue placeholder='All Users' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={"all"}>All</SelectItem>
									{usernames.map((user) => (
										<SelectItem key={user} value={user}>
											{user}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</>
					)}
				</div>

				<div className='w-32'>
					<Label>Limit Posts</Label>
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

			{/* Feeds */}
			<div className='space-y-4'>
				{isLoading && (
					<p className='text-center text-muted-foreground'>
						Loading feeds...
					</p>
				)}
				{error && (
					<p className='text-center text-red-500'>Failed to load feeds.</p>
				)}

				{sortedFeeds.map((feed) => (
					<Card key={feed.id}>
						<CardHeader>
							<CardTitle>{feed.username}</CardTitle>
							<p className='text-xs text-muted-foreground'>
								{new Date(feed.createdAt).toLocaleString()}
							</p>
						</CardHeader>
						<CardContent>
							<p>{feed.text}</p>
						</CardContent>
					</Card>
				))}

				{!isLoading && sortedFeeds.length === 0 && (
					<p className='text-center text-muted-foreground'>
						No feeds found.
					</p>
				)}
			</div>
		</div>
	);
}
