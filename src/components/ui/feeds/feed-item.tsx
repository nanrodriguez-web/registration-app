import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { FEED_T } from "@/types/feed";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import CommentModal from "./comment-modal";
import EditPostModal from "./edit-post";

function pseudoRandomFromString(input: string, max: number) {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		hash = (hash << 5) - hash + input.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash) % max;
}

export default function FeedItem({
	feed,
	interactive = false,
}: {
	feed: FEED_T;
	interactive?: boolean;
}) {
	const navigate = useNavigate();

	const likes = pseudoRandomFromString(feed.id, 30);
	const comments = pseudoRandomFromString(feed.id + "comments", 10);

	const handleNavigateToUserProfile = () => {
		navigate(`/user/?username=${feed.username}`);
	};

	return (
		<Card>
			<CardHeader onClick={handleNavigateToUserProfile}>
				<CardTitle className='flex gap-2 items-center'>
					<img
						className=' w-10 h-10 rounded-full object-cover border cursor-pointer'
						src={feed.user.profilePic}
					/>
					<span className='font-bold text-gray-400'>{feed.username}</span>
				</CardTitle>

				<p className='text-xs text-muted-foreground'>
					{new Date(feed.createdAt).toLocaleString()}
				</p>
			</CardHeader>

			<CardContent className='text-gray-500 max-h-96 overflow-y-scroll'>
				{feed.text}
			</CardContent>
			{interactive && (
				<InteractiveButtons feed={feed} likes={likes} comments={comments} />
			)}
		</Card>
	);
}

function InteractiveButtons({
	feed,
	likes,
	comments,
}: {
	feed: FEED_T;
	likes: number;
	comments: number;
}) {
	return (
		<CardFooter className='text-gray-400'>
			<Button variant='ghost'>
				<ThumbsUp />
				{likes > 0 && ` ${likes}`}
			</Button>

			<CommentModal feed={feed} comments={comments} />

			{/* Show Edit button only for post owner */}
			<EditPostModal feed={feed} />
		</CardFooter>
	);
}
