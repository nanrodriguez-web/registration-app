import config from "@/lib/config";

export default function Bluefletch() {
	const bluefletchIconUrl = config.blue_fletch_logo;

	return (
		<img
			src={bluefletchIconUrl}
			alt='Bluefletch Logo'
			className='filter invert w-auto h-auto'
		/>
	);
}
