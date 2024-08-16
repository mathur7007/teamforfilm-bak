"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

const initialState = {
	searchQuery: "",
	sortField: "",
	sortDirection: "asc",
	filters: {},
	page: 1,
	pageSize: 10,
};

export function useFilter() {
	const [state, setState] = useState(initialState);
	const router = useRouter();
	const searchParams = useSearchParams();

	const isEmpty = (value) => value === "" || (Array.isArray(value) && value.length === 0);

	const updateState = (newState) => {
		setState(newState);
		updateUrlParams(newState);
	};

	const updateUrlParams = (newState) => {
		const params = new URLSearchParams();

		if (newState.searchQuery) params.set("searchQuery", newState.searchQuery);
		if (newState.sortField) params.set("sortField", newState.sortField);
		if (newState.sortDirection !== "asc") params.set("sortDirection", newState.sortDirection);

		Object.entries(newState.filters).forEach(([key, value]) => {
			if (!isEmpty(value)) {
				const filterValues = Array.isArray(value) ? value : value.split(",");
				params.set(key, filterValues.join(","));
			}
		});

		if (newState.page > 1) params.set("page", newState.page);
		if (newState.pageSize !== 10) params.set("pageSize", newState.pageSize);

		router.replace(`?${params.toString()}`, { shallow: true });
	};

	const updateSearchQuery = useDebouncedCallback((term) => {
		updateState({ ...state, searchQuery: term });
	}, 300);

	const updateSorting = (field, direction) => {
		updateState({ ...state, sortField: field, sortDirection: direction });
	};

	const updateFilter = (key, values) => {
		updateState({ ...state, filters: { ...state.filters, [key]: values } });
	};

	const clearAllFilters = () => {
		updateState(initialState);
	};

	const updatePage = (newPage) => {
		updateState({ ...state, page: newPage });
	};

	return {
		searchQuery: state.searchQuery,
		updateSearchQuery,
		sortField: state.sortField,
		sortDirection: state.sortDirection,
		updateSorting,
		filters: state.filters,
		updateFilter,
		clearAllFilters,
		page: state.page,
		pageSize: state.pageSize,
		updatePage,
	};
}
