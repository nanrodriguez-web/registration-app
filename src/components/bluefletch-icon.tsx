import config from "@/lib/config";

export default function Bluefletch({
	inverted = true,
}: {
	inverted?: boolean;
}) {
	const bluefletchIconUrl = config.blue_fletch_logo;

	return (
		<img
			src={bluefletchIconUrl}
			alt='Bluefletch Logo'
			className={`filter w-auto h-auto ${inverted ? "invert" : ""}`}
		/>
	);
}
