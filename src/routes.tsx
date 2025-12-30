import Feeds from "@/pages/feeds";
import SignIn from "@/pages/login";
import Register from "@/pages/registration";
import type { ROUTE_T } from "@/types/route";

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
];
