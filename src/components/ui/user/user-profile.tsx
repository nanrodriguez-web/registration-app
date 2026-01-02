import useAuth from "@/hooks/useAuth";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { Spinner } from "../spinner";

export default function UserProfile() {
	const { user, logout, loggingOut } = useAuth({
		middleware: "auth",
	});

	const navigate = useNavigate();

	const handleNavigateUserProfile = () => {
		navigate(`/user`);
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center justify-center'>
					<>
						<img
							src={user?.profilePic}
							className='w-10 h-10 rounded-full object-cover border cursor-pointer'
						/>
					</>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>

					<DropdownMenuItem onClick={handleNavigateUserProfile}>
						Profile
					</DropdownMenuItem>
					{/*
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem> */}

					<DropdownMenuSeparator />

					<Button
						className='px-2 '
						disabled={loggingOut}
						onClick={logout}
						variant={"ghost"}>
						{loggingOut ? <Spinner /> : "Log out"}
					</Button>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
