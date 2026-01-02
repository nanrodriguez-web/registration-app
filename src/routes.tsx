import Feeds from "@/pages/feeds";
import SignIn from "@/pages/login";
import Post from "@/pages/post";
import Register from "@/pages/registration";
import type { ROUTE_T } from "@/types/route";
import UserPage from "./pages/user";

export const routes: ROUTE_T[] = [
	{
		path: "/",
		name: "SignIn",
		component: SignIn,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/feeds",
		name: "Feeds",
		component: Feeds,
	},
	{
		path: "/feeds/:feedId",
		name: "Post Detail",
		component: Post,
	},
	{
		path: "/feeds/:feedId",
		name: "Post Detail",
		component: Post,
	},
	{
		path: "/user",
		name: "User Detail",
		component: UserPage,
	},
];
