import useAuth from "@/hooks/useAuth";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../button";
import { Spinner } from "../spinner";

export default function UserProfile() {
	const { user, logout, loggingOut } = useAuth({
		middleware: "auth",
	});

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div className='h-5 w-5 border-2 rounded-full'>
						<img src={user?.profilePic} />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>

					<DropdownMenuItem>Profile</DropdownMenuItem>
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
