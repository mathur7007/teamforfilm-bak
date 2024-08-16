"use client";

import TeamMemberDataGrid from "../team-member-data-grid";
import { PaginationControls } from "@/components/Data/PaginationControls";
import { useTeamMembers } from "@/hooks/useTeamMember";
import Loading from "../loading";

export default function TeamMembersLayout({ searchParams }) {
	const { teamMembers, isLoading, error, totalItems } = useTeamMembers(searchParams);

	if (isLoading) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;

	if (teamMembers)
		return (
			<>
				<TeamMemberDataGrid teamMembers={teamMembers} />
				<PaginationControls totalItems={totalItems} />
			</>
		);
}
