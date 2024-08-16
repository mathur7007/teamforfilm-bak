import AppMaxWidthContainer from "@/components/ui/max-width-container";
import TeamMemberFilters from "./_components/team-member-filters";
import TeamMembersLayout from "./_components/team-members";
import { getQueryClient } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllTeamMembers } from "@/app/actions/team_members";

export default async function Page({ searchParams }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["team-members"],
		queryFn: async () => {
			await getAllTeamMembers();

			if (data) return data;
			if (error) return error;
		},
	});

	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
					<div className="flex items-center justify-between space-y-2">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
							<div className="text-muted-foreground">Here&apos;s a list of members for our network!</div>
						</div>
					</div>
					<TeamMemberFilters />
					<HydrationBoundary state={dehydrate(queryClient)}>
						<TeamMembersLayout searchParams={searchParams} />
					</HydrationBoundary>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
