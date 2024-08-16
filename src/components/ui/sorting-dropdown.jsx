"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const SortingDropdown = ({ options, selectedOption, onSelect, className, buttonVariant = "outline", buttonSize = "sm" }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={buttonVariant} size={buttonSize} className={`ml-auto h-8 flex ${className}`}>
					<MixerHorizontalIcon className="mr-2 h-4 w-4" />
					Sort
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				{options.map((option) => (
					<DropdownMenuItem
						key={option.label}
						onSelect={() => onSelect(option)}
						className={`capitalize ${selectedOption === option ? "font-bold" : ""}`}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortingDropdown;
