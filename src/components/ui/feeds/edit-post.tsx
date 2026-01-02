import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFeed } from "@/contexts/feeds/feed-context";
import useAuth from "@/hooks/useAuth";
import { updatePost } from "@/lib/data/feeds";
import type { EDIT_POST_MODAL_PROPS } from "@/types/feed";
import { Pen } from "lucide-react";
import { useState } from "react";
// import { updatePost } from "@/lib/data/feed";

export default function EditPostModal({
	feed,
	onUpdate,
}: EDIT_POST_MODAL_PROPS) {
	const { user: authUser } = useAuth({ middleware: "auth" });
	const { mutate } = useFeed();

	const [text, setText] = useState(feed.text);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [open, setOpen] = useState<boolean>(false);

	// Only show edit if current user owns the post
	if (authUser?.username !== feed.username) return null;

	const handleUpdate = async () => {
		if (!text.trim()) {
			setError("Post cannot be empty");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await updatePost(feed.id, text);
			mutate();

			setOpen(false);
		} catch (err: any) {
			setError(err.message || "Failed to update post");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='ghost' className='text-sm'>
					<Pen />
				</Button>
			</DialogTrigger>

			<DialogContent className='max-w-md space-y-4'>
				<h2 className='text-lg font-bold'>Edit Post</h2>
				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className='w-full resize-none'
					rows={5}
				/>
				{error && <p className='text-red-500'>{error}</p>}
				<div className='flex justify-end gap-2'>
					<Button onClick={handleUpdate} disabled={loading}>
						{loading ? "Updating..." : "Update"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
