import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		// <AppMaxWidthContainer>
		// 	<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
		// 		<div className="flex flex-col space-y-2">
		// 			<Skeleton className="h-8 w-2/6" />
		// 			<Skeleton className="h-4 w-2/4" />
		// 		</div>
		// 		<div className="flex">
		// 			<div className="flex flex-col md:flex-row flex-1 items-start md:items-center gap-4">
		// 				<Skeleton className="h-8 w-3/12" />
		// 				<Skeleton className="h-8 w-2/12" />
		// 				<Skeleton className="h-8 w-1/12" />
		// 				<Skeleton className="h-8 w-1/12" />
		// 			</div>
		// 			<Skeleton className="h-8 w-1/12" />
		// 		</div>
		// 		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
		// 			{Array.from({ length: 10 }).map((_, index) => (
		// 				<div className="flex flex-col space-y-3 w-full" key={index}>
		// 					<Skeleton className="h-[400px] md:h-[350px] lg:h-[300px] rounded-xl" />
		// 					<div className="space-y-2">
		// 						<Skeleton className="h-4 w-2/6" />
		// 						<Skeleton className="h-4 w-2/4" />
		// 					</div>
		// 				</div>
		// 			))}
		// 		</div>
		// 	</div>
		// </AppMaxWidthContainer>
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
			{Array.from({ length: 10 }).map((_, index) => (
				<div className="flex flex-col space-y-3 w-full" key={index}>
					<Skeleton className="h-[400px] md:h-[350px] lg:h-[300px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-2/6" />
						<Skeleton className="h-4 w-2/4" />
					</div>
				</div>
			))}
		</div>
	);
}
