import { QueryClient } from "@tanstack/react-query";

let browserQueryClient;

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// with SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client side
				staleTime: 60 * 1000,
			},
		},
	});
}

export function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if it doesn't exist
		// this is very important so don't re-make a new query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
