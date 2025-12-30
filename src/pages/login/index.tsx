import AuthBGMobile from "@/components/ui/auth/auth-bg-mobile";
import AuthImage from "@/components/ui/auth/auth-image";
import SignInForm from "@/components/ui/auth/login/login-form";

export default function SignIn() {
	return (
		<div className='relative min-h-screen lg:grid lg:grid-cols-2'>
			{/* Image Section */}
			<AuthImage />
			{/* Mobile / Tablet Background */}
			<AuthBGMobile />

			{/* Form Section */}
			<SignInForm />
		</div>
	);
}
