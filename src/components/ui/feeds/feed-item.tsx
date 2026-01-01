import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Feed } from "@/types/feed";
import { MessageSquare } from "lucide-react";
import { Button } from "../button";

export default function FeedItem({ feed }: { feed: Feed }) {
	return (
		<>
			<Card key={feed.id}>
				<CardHeader>
					<CardTitle className='flex gap-2 items-center'>
						<div>
							<img
								className='rounded-full h-10 w-10 '
								src={feed.user.profilePic}
							/>
						</div>

						<span className='font-bold text-gray-400'>
							{feed.username}
						</span>
					</CardTitle>
					<p className='text-xs text-muted-foreground'>
						{new Date(feed.createdAt).toLocaleString()}
					</p>
				</CardHeader>
				<CardContent>
					<p className='text-gray-500'>{feed.text}</p>

					<Button variant={"ghost"}>
						<MessageSquare />
					</Button>
				</CardContent>
			</Card>
		</>
	);
}
