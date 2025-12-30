import AuthBGMobile from "@/components/ui/auth/auth-bg-mobile";
import AuthImage from "@/components/ui/auth/auth-image";
import RegisterForm from "@/components/ui/auth/registration/register-form";

export default function Register() {
	return (
		<div className='relative min-h-screen lg:grid lg:grid-cols-2'>
			{/* Image Section */}
			<AuthImage />

			{/* Mobile / Tablet Background */}
			<AuthBGMobile />

			{/* Form Section */}
			<RegisterForm />
		</div>
	);
}
