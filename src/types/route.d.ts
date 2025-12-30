import type { LucideIcon } from "lucide-react";

export type ROUTE_T = {
	path: string;
	name: string;
	component: React.FC;
	icon?: LucideIcon;
};
