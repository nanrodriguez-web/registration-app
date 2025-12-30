import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function SignInForm() {
	return (
		<div className='relative z-10 flex items-center justify-center p-6'>
			<Card className='w-full max-w-sm bg-background/95 backdrop-blur mt-10'>
				<CardHeader>
					<CardTitle className='text-center text-xl'>Sign In</CardTitle>
				</CardHeader>

				<CardContent>
					<form className='space-y-4'>
						<div className='space-y-1'>
							<Label htmlFor='username'>Username</Label>
							<Input id='username' type='text' />
						</div>

						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' />
						</div>

						<Button className='w-full' type='submit'>
							SignIn
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
