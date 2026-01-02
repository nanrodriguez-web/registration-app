"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/data/feeds";
import { useState } from "react";
import { mutate } from "swr";

export default function CreatePost() {
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		if (!text.trim()) return;

		try {
			setLoading(true);
			setError(null);

			await createPost(text);

			setText("");
			mutate("feeds"); // refresh feed list
		} catch (err: any) {
			console.log({ "error creating post": err });
			setError("Failed to create post");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='mb-2'>
				<Textarea
					placeholder='What’s on your mind?'
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows={3}
				/>

				{error && <p className='text-sm text-red-500'>{error}</p>}

				<div className='flex justify-end mt-3'>
					<Button
						onClick={handleSubmit}
						disabled={loading || !text.trim()}>
						{loading ? "Posting..." : "Post"}
					</Button>
				</div>
			</div>
		</>
	);
}
