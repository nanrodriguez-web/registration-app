import CreatePost from "@/components/ui/feeds/create-post";
import NavBar from "@/components/ui/navigation/nav-bar";

export default function FeedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='mx-auto space-y-6 min-h-screen'>
			<div className=' border-b p-6 w-full'>
				<div className='max-w-3xl mx-auto'>
					<NavBar />
				</div>
			</div>

			<div>
				<CreatePost />
			</div>

			<div className='max-w-3xl mx-auto'>{children}</div>
		</div>
	);
}
