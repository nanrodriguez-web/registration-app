// src/pages/NotFound.tsx
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom"; // If using React Router

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
			<Card className='w-full max-w-md text-center'>
				<CardHeader>
					<CardTitle className='text-6xl'>404</CardTitle>
					<CardDescription>Page Not Found</CardDescription>
				</CardHeader>
				<CardContent>
					<p>The page you are looking for does not exist.</p>
					<Button className='mt-4' onClick={() => navigate("/feeds")}>
						Go Home
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
