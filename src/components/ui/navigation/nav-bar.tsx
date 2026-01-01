import Bluefletch from "@/components/bluefletch-icon";
import UserProfile from "../user/user-profile";

export default function NavBar() {
	return (
		<div className='flex w-full justify-between items-center'>
			<div className='w-40'>
				<Bluefletch inverted={false} />
			</div>
			<UserProfile />
		</div>
	);
}
