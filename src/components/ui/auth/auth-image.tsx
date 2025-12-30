import Bluefletch from "@/components/bluefletch-icon";
import config from "@/lib/config";

export default function AuthImage() {
	return (
		<div
			className='relative hidden lg:block bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${config.blue_fletch_bg_url})` }}>
			{/* Dark overlay (transparent) */}
			{/* <div className='absolute inset-0 bg-black/50' /> */}

			{/* Content */}
			<div className='relative z-10 flex h-full items-center justify-center p-5'>
				<Bluefletch />
			</div>
		</div>
	);
}
