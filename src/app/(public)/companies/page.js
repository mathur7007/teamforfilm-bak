import AppBanner from "@/components/AppBanner";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CompanyCard from "@/components/Card/Company";

export default function Companies() {
	const companies = [
		{
			name: "Stripe",
			username: "Open Jobs – 5",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Dropbox",
			username: "Open Jobs – 12",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Figma",
			username: "Open Jobs – 2",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Udemy",
			username: "Open Jobs – 29",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling. prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling..",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Figma",
			username: "Open Jobs – 22",
			description: "To begin, prepare the aromatics for the chicken. Blanch ",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
	];
	return (
		<div className="bg-white">
			<AppMaxWidthContainer>
				<div class="flex gap-4 py-20">
					<div class="relative w-3/12">
						<form className="grid w-full items-start gap-6">
							<div className="grid gap-6">
								<h2 className="text-3xl font-bold">Settings</h2>
								<div className="grid gap-3">
									<Label htmlFor="temperature">Search by Keywords</Label>
									<Input id="temperature" type="text" placeholder="Job title, keywords, or company" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="temperature">Locationords</Label>
									<Input id="temperature" type="text" placeholder="City or Post Code" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="model">Model</Label>
									<Select>
										<SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
											<SelectValue placeholder="Select a model" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="genesis">
												<div className="flex items-start gap-3 text-muted-foreground">
													<div className="grid gap-0.5">
														<p>
															Neural <span className="font-medium text-foreground">Genesis</span>
														</p>
														<p className="text-xs" data-description>
															Our fastest model for general use cases.
														</p>
													</div>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="temperature">Temperature</Label>
									<Input id="temperature" type="number" placeholder="0.4" />
								</div>
							</div>
						</form>
					</div>
					<div class="relative w-9/12">
						<div className="flex items-start gap-4">
							<h2 className="text-3xl font-bold">Companies</h2>
							<span className="px-2 py-1 border rounded-full">386</span>
							<div className="ml-auto gap-1.5 text-sm">
								<Select>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sort by (default)" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Newest</SelectItem>
										<SelectItem value="dark">Oldest</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="mt-4 grid grid-cols-3 gap-3">
							{companies?.map((company) => (
								<CompanyCard key={company.username} company={company} />
							))}
						</div>
					</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
