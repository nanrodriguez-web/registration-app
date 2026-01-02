import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { USER_T } from "@/types/user";

export default function ProfilePicModal({ user }: { user: USER_T }) {
	const imgSrc = user.profilePic || "/default-profile.png";

	return (
		<Dialog>
			<DialogTrigger asChild>
				<img
					src={imgSrc}
					alt={`${user.username} profile`}
					className='w-32 h-32 rounded-full object-cover border cursor-pointer'
				/>
			</DialogTrigger>

			<DialogContent className='flex justify-center items-center'>
				<img
					src={imgSrc}
					alt={`${user.username} profile`}
					className='max-w-full max-h-[80vh] object-contain border'
				/>
			</DialogContent>
		</Dialog>
	);
}
