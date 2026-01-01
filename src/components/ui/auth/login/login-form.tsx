import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import type { AUTH_ERROR_T, SIGNIN_T } from "@/types/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorInput from "../../error-input";

export default function SignInForm() {
	const { SignIn } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/feeds",
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [form, setForm] = useState<SIGNIN_T>({
		username: "",
		password: "",
	});

	const [formErrors, setFormErrors] = useState<AUTH_ERROR_T | null>(null);
	const [loading, setLoading] = useState(false);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// clear the error
		setFormErrors(null);

		setLoading(true);

		await SignIn(form, setFormErrors);

		setLoading(false);
	};

	return (
		<div className='relative z-10 flex items-center justify-center p-6'>
			<Card className='w-full max-w-sm bg-background/95 backdrop-blur mt-10'>
				<CardHeader>
					<CardTitle className='text-center text-xl'>Sign In</CardTitle>
				</CardHeader>

				<CardContent>
					<form className='space-y-4' onSubmit={handleSubmit}>
						<div className='space-y-1'>
							<Label htmlFor='username'>Username</Label>
							<Input
								disabled={loading}
								id='username'
								name='username'
								type='text'
								value={form.username}
								onChange={handleFormChange}
								required
							/>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>

							<div className='relative'>
								<Input
									disabled={loading}
									id='password'
									name='password'
									type={showPassword ? "text" : "password"}
									value={form.password}
									onChange={handleFormChange}
									required
									className='pr-10'
								/>

								<button
									type='button'
									disabled={loading}
									onClick={() => setShowPassword((prev) => !prev)}
									className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50'
									aria-label={
										showPassword ? "Hide password" : "Show password"
									}>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						{formErrors && (
							<ErrorInput errorMessage={formErrors?.message} />
						)}

						<Button className='w-full' type='submit' disabled={loading}>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>

					<p className='mt-4 text-center text-sm text-muted-foreground'>
						Don’t have an account?{" "}
						<Link
							to='/register'
							className='font-medium text-primary hover:underline'>
							Register
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
