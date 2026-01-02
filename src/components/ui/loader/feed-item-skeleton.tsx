import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, ThumbsUp } from "lucide-react";

export default function FeedItemSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					{/* Avatar */}
					<Skeleton className='h-10 w-10 rounded-full' />

					{/* Username */}
					<Skeleton className='h-4 w-32' />
				</CardTitle>

				{/* Date */}
				<Skeleton className='h-3 w-40 mt-2' />
			</CardHeader>

			<CardContent>
				{/* Feed text */}
				<div className='space-y-2 mb-4'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-11/12' />
					<Skeleton className='h-4 w-4/5' />
				</div>

				{/* Action button */}
				<Button variant='ghost' disabled>
					<ThumbsUp className='text-muted-foreground' />
				</Button>
				<Button variant='ghost' disabled>
					<MessageSquare className='text-muted-foreground' />
				</Button>
			</CardContent>
		</Card>
	);
}
