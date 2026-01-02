import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function BackToFeeds() {
	const navigate = useNavigate();

	return (
		<div>
			{" "}
			<Button variant={"ghost"} onClick={() => navigate("/feeds")}>
				<ChevronLeft /> Back to feeds
			</Button>
		</div>
	);
}
