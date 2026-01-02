import NavBar from "@/components/ui/navigation/nav-bar";

export default function FeedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='mx-auto space-y-6 min-h-screen'>
			<div className=' border-b p-3 md: w-full'>
				<div className='max-w-3xl mx-auto'>
					<NavBar />
				</div>
			</div>

			<div className='max-w-3xl mx-auto md:px-0 px-3'>{children}</div>
		</div>
	);
}
