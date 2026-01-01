export default function ErrorInput({
	errorMessage = "",
}: {
	errorMessage?: string | null;
}) {
	if (!errorMessage) {
		return null;
	}
	return (
		<div>
			<p className='text-red-500 text-xs mt-1'>{errorMessage}</p>
		</div>
	);
}
