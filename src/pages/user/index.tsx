// import ProfilePic from "@/components/User/ProfilePcc";
import BackToFeeds from "@/components/ui/back-to-feeds";
import UserProfileSkeleton from "@/components/ui/loader/user-profile-skeleton";
import ProfilePic from "@/components/ui/user/profile-pic";
import useAuth from "@/hooks/useAuth";
import FeedLayout from "@/layout/feed-layout";
import { getUser } from "@/lib/data/user";
import type { USER_T } from "@/types/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function UserPage() {
	const { user: authUser } = useAuth({ middleware: "auth" }); // logged-in user
	const [user, setUser] = useState<USER_T | null>(null);
	const [loading, setLoading] = useState(true);
	const [searchParams] = useSearchParams();

	const username = searchParams.get("username") || undefined;

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);

			if (!username) {
				// If no username in query, use the logged-in user
				setUser(authUser ?? null);
				setLoading(false);
				return;
			}

			const data = await getUser(username);
			setUser(data);
			setLoading(false);
		};

		fetchUser();
	}, [username, authUser]);

	if (loading) {
		return (
			<FeedLayout>
				<UserProfileSkeleton />
			</FeedLayout>
		);
	}

	return (
		<FeedLayout>
			<>
				{user && !loading ? (
					<>
						<>
							<BackToFeeds />
							<div className='max-w-md mx-auto p-4 space-y-4 min-h-screen'>
								<h1 className='text-2xl font-bold'>
									{user.firstName} {user.lastName} (@{user.username})
								</h1>

								{/* Profile picture */}
								<ProfilePic
									user={user}
									setUser={setUser}
									canEdit={authUser?.username === user.username}
								/>

								{/* User info */}
								<div>
									<p>
										<strong>Username:</strong> {user.username}
									</p>
									<p>
										<strong>Name:</strong> {user.firstName}{" "}
										{user.lastName}
									</p>
								</div>
							</div>
						</>
					</>
				) : (
					<>
						<h3>User not found</h3>
					</>
				)}
			</>
		</FeedLayout>
	);
}
