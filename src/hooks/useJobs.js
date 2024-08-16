"use client";

import { getAllJobPosts } from "@/app/actions/jobPosts";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useJobs(params) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const response = await getAllJobPosts();
			if (response.data) return response.data;
			if (response.error) throw new Error(response.error);
		},
	});

	const filterdJObs = useMemo(() => {
		if (!data) return [];

		const { searchQuery, sortField, sortDirection, filmDepartments, AgeCategory, languageSkills, location } = params;

		let jobs = data;

		if (searchQuery) {
			jobs = jobs.filter((member) => member.firstName?.toLowerCase().includes(searchQuery.toLowerCase()));
		}

		// if (filmDepartments) {
		// 	const filmDeptArray = filmDepartments.split(",");
		// 	jobs = jobs.filter((member) => member.filmDepartments?.some((dep) => filmDeptArray.includes(dep)));
		// }

		// if (AgeCategory) {
		// 	const ageCategoryArray = AgeCategory.split(",");
		// 	jobs = jobs.filter((member) => ageCategoryArray.includes(member.ageGroup));
		// }

		// if (languageSkills) {
		// 	const languageSkillsArray = languageSkills.split(",");
		// 	jobs = jobs.filter((member) => member.languageSkills?.some((skill) => languageSkillsArray.includes(skill)));
		// }

		// if (location) {
		// 	const locationArray = location.split(",");
		// 	jobs = jobs.filter((member) => locationArray.includes(member.location));
		// }

		// Sorting logic
		if (sortField) {
			jobs = jobs.sort((a, b) => {
				if (sortDirection === "asc") {
					return a[sortField] > b[sortField] ? 1 : -1;
				} else {
					return a[sortField] < b[sortField] ? 1 : -1;
				}
			});
		}

		return jobs;
	}, [data, params]);

	const paginatedJobs = useMemo(() => {
		const { page = 1, pageSize = 10 } = params;

		return filterdJObs.slice((page - 1) * pageSize, page * pageSize);
	}, [filterdJObs, params]);

	const totalItems = filterdJObs.length;

	return {
		jobs: paginatedJobs,
		isLoading,
		error,
		totalItems,
	};
}
