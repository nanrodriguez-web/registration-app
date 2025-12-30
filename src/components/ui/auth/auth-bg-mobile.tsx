import Bluefletch from "@/components/bluefletch-icon";
import { config } from "@/lib/config";

export default function AuthBGMobile() {
	return (
		<>
			{/* Mobile / Tablet Background */}
			<div
				className='absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat p-5 flex items-end justify-center'
				style={{ backgroundImage: `url(${config.blue_fletch_bg_url})` }}>
				<Bluefletch />
			</div>
		</>
	);
}
