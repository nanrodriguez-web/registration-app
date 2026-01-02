export default function UserProfileSkeleton() {
	return (
		<>
			<div className='max-w-md mx-auto p-4 space-y-4 min-h-screen'>
				{/* Skeleton for Name */}
				<div className='h-8 w-3/4 bg-gray-300 rounded-md animate-pulse'></div>

				{/* Skeleton for Profile Picture */}
				<div className='h-32 w-32 bg-gray-300 rounded-full animate-pulse mx-auto'></div>

				{/* Skeleton for Info */}
				<div className='space-y-2 mt-4'>
					<div className='h-4 w-full bg-gray-300 rounded-md animate-pulse'></div>
					<div className='h-4 w-5/6 bg-gray-300 rounded-md animate-pulse'></div>
				</div>
			</div>
		</>
	);
}
