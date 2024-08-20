"use client";

import { Button } from "@/components/ui/button";
import FacetedDropdownFilter from "@/components/ui/faceted-dropdown-filter";
import { Input } from "@/components/ui/input";
import SortingDropdown from "@/components/ui/sorting-dropdown";
import { useFilter } from "@/hooks/useFilter";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useDebouncedCallback } from "use-debounce";
import { useState, useTransition } from "react";

const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

const sortingOptions = [
	{ label: "Name Asc", field: "firstName", direction: "asc" },
	{ label: "Name Desc", field: "firstName", direction: "desc" },
	{ label: "Oldest", field: "updatedAt", direction: "desc" },
	{ label: "Latest", field: "updatedAt", direction: "asc" },
];

export default function JobFilters() {
	const { searchQuery, updateSearchQuery, sortField, sortDirection, updateSorting, filters, updateFilter, clearAllFilters } = useFilter();

	const [searchTerm, setSearchTerm] = useState(searchQuery);
	const [isPending, startTransition] = useTransition();

	const handleSort = (option) => {
		updateSorting(option.field, option.direction);
	};

	const selectedOption = sortingOptions.find((option) => option.field === sortField && option.direction === sortDirection);

	const handleSearch = useDebouncedCallback((term) => {
		startTransition(() => {
			updateSearchQuery(term);
		});
	}, 300);

	const onInputChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		handleSearch(term);
	};

	return (
		<div className="flex items-start md:items-center flex-wrap justify-between">
			<div className="flex flex-col md:flex-row flex-1 items-start md:items-center gap-4">
				<Input
					type="text"
					placeholder="Search Company..."
					className="h-8 w-[150px] lg:w-[250px] p-2 border rounded"
					value={searchTerm}
					onChange={onInputChange}
					disabled={isPending}
				/>

				{/* <FacetedDropdownFilter
					title="Film Department"
					options={filmDepartmentOptions}
					filterKey="projectGenre"
					selectedValues={selectedFilters.projectGenre || []}
					onFilterChange={updateFilter}
				/>

				<FacetedDropdownFilter
					title="Age Category"
					options={ageCategoryOptions}
					filterKey="actorRequirements.age"
					selectedValues={selectedFilters.actorRequirements?.age || []}
					onFilterChange={updateFilter}
				/>

				<FacetedDropdownFilter
					title="Language"
					options={languageOptions}
					filterKey="projectLanguage"
					selectedValues={selectedFilters.projectLanguage || []}
					onFilterChange={updateFilter}
				/>

				<FacetedDropdownFilter
					title="Location"
					options={locationOptions}
					filterKey="auditionLocation"
					selectedValues={selectedFilters.auditionLocation || []}
					onFilterChange={updateFilter}
				/> */}

				{!isObjectEmpty(filters) && (
					<Button variant="ghost" className="h-8 px-2 lg:px-3" onClick={clearAllFilters}>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div>
				<SortingDropdown options={sortingOptions} selectedOption={selectedOption} onSelect={handleSort} className="mr-2" />
			</div>
		</div>
	);
}
