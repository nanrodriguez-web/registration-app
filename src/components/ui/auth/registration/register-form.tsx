import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import type { AUTH_ERROR_T, SIGNUP_T } from "@/types/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
	const { Register } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/feeds",
	});

	const [form, setForm] = useState<SIGNUP_T>({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
	});

	const [formErrors, setFormErrors] = useState<AUTH_ERROR_T | null>(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		await Register(form, setFormErrors);

		setLoading(false);
	};

	return (
		<div className='relative z-10 flex items-center justify-center p-6'>
			<Card className='w-full max-w-sm bg-background/95 backdrop-blur mt-10'>
				<CardHeader>
					<CardTitle className='text-center text-xl'>Register</CardTitle>
				</CardHeader>

				<CardContent>
					<form className='space-y-4' onSubmit={handleSubmit}>
						{/* Global error */}
						{formErrors?.message && (
							<p className='text-sm text-destructive text-center'>
								{formErrors.message}
							</p>
						)}

						<div className='space-y-1'>
							<Label htmlFor='firstname'>First name</Label>
							<Input
								id='firstname'
								name='firstname'
								value={form.firstname}
								onChange={handleFormChange}
								disabled={loading}
								required
							/>
						</div>

						<div className='space-y-1'>
							<Label htmlFor='lastname'>Last name</Label>
							<Input
								id='lastname'
								name='lastname'
								value={form.lastname}
								onChange={handleFormChange}
								disabled={loading}
								required
							/>
						</div>

						<div className='space-y-1'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								name='username'
								value={form.username}
								onChange={handleFormChange}
								disabled={loading}
								required
							/>
						</div>

						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>

							<div className='relative'>
								<Input
									id='password'
									name='password'
									type={showPassword ? "text" : "password"}
									value={form.password}
									onChange={handleFormChange}
									disabled={loading}
									required
									className='pr-10'
								/>

								<button
									type='button'
									disabled={loading}
									onClick={() => setShowPassword((p) => !p)}
									className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50'>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						<Button className='w-full' type='submit' disabled={loading}>
							{loading ? "Registering..." : "Register"}
						</Button>
					</form>

					<p className='mt-4 text-center text-sm text-muted-foreground'>
						Already have an account?{" "}
						<Link
							to='/'
							className='font-medium text-primary hover:underline'>
							Sign In
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
