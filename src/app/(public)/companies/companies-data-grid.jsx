"use client";

import { PaginationControls } from "@/components/Data/PaginationControls";
import { useCompanies } from "@/hooks/useCompanies";
import CompanyFilters from "./_components/companies-filters";
import CompanyCard from "@/components/Card/Company";

export default function CompaniesDataGrid({ searchParams }) {
	const { companies, isLoading, error, totalItems } = useCompanies(searchParams);

	if (isLoading) return <>Loading...</>;
	if (error) return <div>Error: {error.message}</div>;

	if (companies)
		return (
			<div className="space-y-10">
				<CompanyFilters />
				{companies && companies.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{companies?.map((company) => (
							<CompanyCard key={company.id} company={company}></CompanyCard>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center min-h-[250px] text-3xl">No Company found</div>
				)}
				<PaginationControls totalItems={totalItems} />
			</div>
		);
}
