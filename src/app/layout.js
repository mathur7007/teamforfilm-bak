import "@/app/globals.css";
import { basicInfo } from "@/config/site";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: {
		default: basicInfo.name,
		template: `%s - ${basicInfo.name}`,
	},
	metadataBase: new URL(basicInfo.url),
	description: basicInfo.description,
	keywords: [],
	authors: [
		{
			name: basicInfo.name,
		},
	],
	// openGraph: {
	// 	type: "website",
	// 	locale: "en_US",
	// 	url: basicInfo.url,
	// 	title: basicInfo.name,
	// 	description: basicInfo.description,
	// 	siteName: basicInfo.name,
	// 	images: [
	// 		{
	// 			url: basicInfo.ogImage,
	// 			width: 1200,
	// 			height: 630,
	// 			alt: basicInfo.name,
	// 		},
	// 	],
	// },
	// twitter: {
	// 	card: "summary_large_image",
	// 	title: basicInfo.name,
	// 	description: basicInfo.description,
	// 	images: [basicInfo.ogImage],
	// 	creator: "@shadcn",
	// },
	// icons: {
	// 	icon: "/favicon.ico",
	// 	shortcut: "/favicon-16x16.png",
	// 	apple: "/apple-touch-icon.png",
	// },
	// manifest: `${basicInfo.url}/site.webmanifest`,
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={cn("min-h-screen bg-background font-sans antialiased dark", fontSans.variable)}>
				<Providers>
					<AuthProvider>{children}</AuthProvider>
				</Providers>
				<Toaster richColors position="top-right" />
			</body>
		</html>
	);
}
