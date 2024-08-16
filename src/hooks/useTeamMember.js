"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllTeamMembers } from "@/app/actions/team_members";

export function useTeamMembers(params) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["teamMembers"],
		queryFn: async () => {
			const response = await getAllTeamMembers();
			if (response.data) return response.data;
			if (response.error) throw new Error(response.error);
		},
	});

	const filteredTeamMembers = useMemo(() => {
		if (!data) return [];

		const { searchQuery, sortField, sortDirection, filmDepartments, AgeCategory, languageSkills, location } = params;

		let teamMembers = data;

		if (searchQuery) {
			teamMembers = teamMembers.filter((member) => member.firstName?.toLowerCase().includes(searchQuery.toLowerCase()));
		}

		if (filmDepartments) {
			const filmDeptArray = filmDepartments.split(",");
			teamMembers = teamMembers.filter((member) => member.filmDepartments?.some((dep) => filmDeptArray.includes(dep)));
		}

		if (AgeCategory) {
			const ageCategoryArray = AgeCategory.split(",");
			teamMembers = teamMembers.filter((member) => ageCategoryArray.includes(member.ageGroup));
		}

		if (languageSkills) {
			const languageSkillsArray = languageSkills.split(",");
			teamMembers = teamMembers.filter((member) => member.languageSkills?.some((skill) => languageSkillsArray.includes(skill)));
		}

		if (location) {
			const locationArray = location.split(",");
			teamMembers = teamMembers.filter((member) => locationArray.includes(member.location));
		}

		// Sorting logic
		if (sortField) {
			teamMembers = teamMembers.sort((a, b) => {
				if (sortDirection === "asc") {
					return a[sortField] > b[sortField] ? 1 : -1;
				} else {
					return a[sortField] < b[sortField] ? 1 : -1;
				}
			});
		}

		return teamMembers;
	}, [data, params]);

	const paginatedTeamMembers = useMemo(() => {
		const { page = 1, pageSize = 10 } = params;

		return filteredTeamMembers.slice((page - 1) * pageSize, page * pageSize);
	}, [filteredTeamMembers, params]);

	const totalItems = filteredTeamMembers.length;

	return {
		teamMembers: paginatedTeamMembers,
		isLoading,
		error,
		totalItems,
	};
}
