"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/Schemas";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomSeparator from "@/components/ui/custom-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import SocialLoginButtons from "@/components/Auth/SocialLoginButtons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FiLoader, FiSend } from "react-icons/fi";

export default function LoginForm() {
	const { loginWithEmail, loginWithGoogle, loginWithFacebook } = useAuth();
	const router = useRouter();
	const formHook = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	const [errorMessage, setErrorMessage] = useState("");
	const [redirecting, setRedirecting] = useState(false); // State to track redirecting status

	async function onSubmit(formData) {
		const validatedFields = LoginSchema.safeParse(formData);

		if (!validatedFields.success) {
			return { error: "invalid fields" };
		}

		const { email, password } = validatedFields.data;

		try {
			await loginWithEmail(email, password);
			setRedirecting(true);
			router.push("/account/profile");
		} catch (error) {
			setErrorMessage("Error: " + error.message);
		}
	}

	async function onSocialLogin(type) {
		const loginFunctions = {
			google: loginWithGoogle,
			facebook: loginWithFacebook,
		};

		const loginFunction = loginFunctions[type];

		if (loginFunction) {
			try {
				await loginFunction();
				setRedirecting(true);
				router.push("/account/profile");
			} catch (error) {
				setErrorMessage("Error: " + error.message);
			}
		} else {
			setErrorMessage("Invalid login type");
		}
	}

	return (
		<>
			<Form {...formHook}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="example@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput placeholder="*******" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="text-muted-foreground font-medium">
						<Link href="/forgot-password">Forgot Password?</Link>
					</div>
					<Button
						type="submit"
						className="w-full relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out bg-blue-600 rounded-lg shadow-xl group hover:bg-gradient-to-br from-blue-500 to-purple-600"
						disabled={isSubmitting || redirecting}
					>
						{redirecting ? (
							<div className="flex items-center">
								<FiSend className="animate-bounce mr-2" />
								Redirecting...
							</div>
						) : isSubmitting ? (
							<>
								<FiLoader className="mr-2 h-4 w-4 animate-spin" />
								Logging in...
							</>
						) : (
							"Login"
						)}
					</Button>
				</form>
			</Form>
			{errorMessage && (
				<div className="pt-5">
					<Alert variant="destructive">
						<AlertDescription className="text-center">{errorMessage}</AlertDescription>
					</Alert>
				</div>
			)}
			<CustomSeparator text="Or Sign In with" />
			<SocialLoginButtons onSocialLogin={onSocialLogin} />
		</>
	);
}
