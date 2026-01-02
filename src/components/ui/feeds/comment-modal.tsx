import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFeed } from "@/contexts/feeds/feed-context";
import { createComment } from "@/lib/data/feeds";
import type { FEED_T } from "@/types/feed";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../textarea";
import FeedItem from "./feed-item";

export default function CommentModal({
	feed,
	comments = 0,
}: {
	feed: FEED_T;
	comments?: number;
}) {
	const { mutate } = useFeed();
	const [text, setText] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleSubmit = async () => {
		if (!text.trim()) return setError("Comment cannot be empty");

		setIsSubmitting(true);
		setError(null);

		try {
			await createComment(feed.id, text.trim());
			setSuccess(true);
			setText("");
			mutate();
			setOpenModal(false);
		} catch (err: any) {
			setError(err.message || "Failed to create comment");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button variant='ghost'>
					<MessageSquare />
					{comments > 0 && ` ${comments}`}
				</Button>
			</DialogTrigger>

			<DialogContent className='max-w-md'>
				{/* <DialogHeader>
					<DialogTitle>Add a Comment</DialogTitle>
					<DialogDescription>
						Write your comment below and submit it.
					</DialogDescription>
				</DialogHeader> */}

				<div>
					<FeedItem feed={feed} />
				</div>

				<Textarea
					className='w-full p-2 border rounded mt-4'
					placeholder='Write your comment...'
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows={4}
				/>

				{error && <p className='text-red-500 mt-2'>{error}</p>}
				{success && <p className='text-green-500 mt-2'>Comment posted!</p>}

				<div className='mt-4 flex justify-end gap-2'>
					<Button
						variant='secondary'
						onClick={() => setText("")}
						disabled={isSubmitting}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isSubmitting}>
						{isSubmitting ? "Posting..." : "Comment"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
