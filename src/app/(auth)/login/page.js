import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Forms/LoginForm";

export const metadata = {
	title: "Login",
};

export default function Login() {
	return (
		<AuthContainer
			heading="Login"
			subHeading="Enter your email below to login to your account"
			footerHeading="Don't have an account?"
			footerLinkText="Register"
			footerLink="/register"
		>
			<LoginForm />
		</AuthContainer>
	);
}
