"use client";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PaginationControls({ totalItems }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const page = Number(searchParams.get("page")) || 1;
	const pageSize = Number(searchParams.get("pageSize")) || 10;
	const totalPages = Math.ceil(Number(totalItems) / pageSize);

	const params = new URLSearchParams(searchParams);

	function setPageSize(pageSize) {
		if (pageSize) {
			params.set("pageSize", pageSize);
		} else {
			params.delete(pageSize);
		}
		replace(`${pathname}?${params.toString()}`);
	}

	function setPage(page) {
		if (page) {
			params.set("page", page);
		} else {
			params.delete(page);
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<div className="flex justify-start items-center gap-5 w-full">
				<p className="text-sm font-medium">Rows per page</p>
				<Select value={`${pageSize}`} onValueChange={(value) => setPageSize(Number(value))}>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={pageSize} />
					</SelectTrigger>
					<SelectContent side="top">
						{[10, 20, 30, 40, 50].map((size) => (
							<SelectItem key={size} value={`${size}`}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex justify-end items-center w-full gap-5">
				<div className="flex items-center justify-center text-sm font-medium">
					Page {page} of {totalPages}
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(1)} disabled={page === 1}>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(Math.max(page - 1, 0))} disabled={page === 1}>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages}>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
