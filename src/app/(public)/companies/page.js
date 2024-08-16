import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query";
import { getAllCompanies } from "@/app/actions/companies";
import CompaniesDataGrid from "./companies-data-grid";

export default async function Companies({ searchParams }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const response = await getAllCompanies();
			if (response.data) return response.data;
			if (response.error) throw new Error(response.error);
		},
	});

	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
					<div className="flex items-center justify-between space-y-2">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">Companies</h2>
							<p className="text-muted-foreground">Here&apos;s a list of Company for our network!</p>
						</div>
					</div>
					<HydrationBoundary state={dehydrate(queryClient)}>
						<CompaniesDataGrid searchParams={searchParams} />
					</HydrationBoundary>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
