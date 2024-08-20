"use client";

import { PaginationControls } from "@/components/Data/PaginationControls";
import JobCard from "@/components/Card/Job";
import JobFilters from "./_components/job-filters";
import { useJobs } from "@/hooks/useJobs";

export default function JobsDataGrid({ searchParams }) {
	const { jobs, isLoading, error, totalItems } = useJobs(searchParams);

	if (isLoading) return <>Loading...</>;
	if (error) return <div>Error: {error.message}</div>;

	if (jobs)
		return (
			<div className="space-y-10">
				<JobFilters />
				{jobs && jobs.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{jobs?.map((job) => (
							<JobCard key={job.id} job={job}></JobCard>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center min-h-[250px] text-3xl">No Job Found</div>
				)}
				<PaginationControls totalItems={totalItems} />
			</div>
		);
}
