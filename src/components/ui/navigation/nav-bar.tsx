import Bluefletch from "@/components/bluefletch-icon";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import UserProfile from "../user/user-profile";

export default function NavBar() {
	const navigate = useNavigate();

	const handleNavigateTofeeds = () => {
		navigate("/feeds");
	};

	return (
		<div className='flex w-full justify-between items-center'>
			<div className='w-40'>
				<Button
					className='p-0 m-0'
					variant={"ghost"}
					onClick={handleNavigateTofeeds}>
					<Bluefletch inverted={false} />
				</Button>
			</div>
			<UserProfile />
		</div>
	);
}
