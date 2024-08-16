"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers({ children }) {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ProgressBar height="2px" color="#ffffff" options={{ showSpinner: true }} shallowRouting />
		</QueryClientProvider>
	);
}
