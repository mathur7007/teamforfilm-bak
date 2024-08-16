"use client";

import TeamMemberCard from "@/components/Card/TeamMember";

export default function TeamMemberDataGrid({ teamMembers }) {
	return (
		<div className="space-y-10">
			{teamMembers && !teamMembers.error ? (
				<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{teamMembers?.map((teamMember) => (
						<TeamMemberCard key={teamMember.uid} teamMember={teamMember}></TeamMemberCard>
					))}
				</div>
			) : (
				<div className="flex justify-center items-center text-3xl">No Data</div>
			)}
		</div>
	);
}
