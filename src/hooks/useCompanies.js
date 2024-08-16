"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllCompanies } from "@/app/actions/companies";

export function useCompanies(params) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["companies"],
		queryFn: async () => {
			const response = await getAllCompanies();
			if (response.data) return response.data;
			if (response.error) throw new Error(response.error);
		},
	});

	const filterdCompanies = useMemo(() => {
		if (!data) return [];

		const { searchQuery, sortField, sortDirection, filmDepartments, AgeCategory, languageSkills, location } = params;

		let companies = data;

		if (searchQuery) {
			companies = companies.filter((member) => member.firstName?.toLowerCase().includes(searchQuery.toLowerCase()));
		}

		// if (filmDepartments) {
		// 	const filmDeptArray = filmDepartments.split(",");
		// 	companies = companies.filter((member) => member.filmDepartments?.some((dep) => filmDeptArray.includes(dep)));
		// }

		// if (AgeCategory) {
		// 	const ageCategoryArray = AgeCategory.split(",");
		// 	companies = companies.filter((member) => ageCategoryArray.includes(member.ageGroup));
		// }

		// if (languageSkills) {
		// 	const languageSkillsArray = languageSkills.split(",");
		// 	companies = companies.filter((member) => member.languageSkills?.some((skill) => languageSkillsArray.includes(skill)));
		// }

		// if (location) {
		// 	const locationArray = location.split(",");
		// 	companies = companies.filter((member) => locationArray.includes(member.location));
		// }

		// Sorting logic
		if (sortField) {
			companies = companies.sort((a, b) => {
				if (sortDirection === "asc") {
					return a[sortField] > b[sortField] ? 1 : -1;
				} else {
					return a[sortField] < b[sortField] ? 1 : -1;
				}
			});
		}

		return companies;
	}, [data, params]);

	const paginatedCompanies = useMemo(() => {
		const { page = 1, pageSize = 10 } = params;

		return filterdCompanies.slice((page - 1) * pageSize, page * pageSize);
	}, [filterdCompanies, params]);

	const totalItems = filterdCompanies.length;

	return {
		companies: paginatedCompanies,
		isLoading,
		error,
		totalItems,
	};
}
