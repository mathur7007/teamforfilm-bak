"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { ScrollArea } from "./scroll-area";

export default function FacetedDropdownFilter({ title, options, filterKey, onFilterChange, selectedValues }) {
	const [localSelectedValues, setLocalSelectedValues] = useState(new Set(selectedValues));

	useEffect(() => {
		setLocalSelectedValues(new Set(selectedValues));
	}, [selectedValues]);

	const handleSelect = (value) => {
		const newSelectedValues = new Set(localSelectedValues);
		if (newSelectedValues.has(value)) {
			newSelectedValues.delete(value);
		} else {
			newSelectedValues.add(value);
		}
		setLocalSelectedValues(newSelectedValues);
		onFilterChange && onFilterChange(filterKey, Array.from(newSelectedValues));
	};

	const clearFilters = () => {
		setLocalSelectedValues(new Set());
		onFilterChange && onFilterChange(filterKey, []);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title}
					{localSelectedValues.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
								{localSelectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{localSelectedValues.size > 2 ? (
									<Badge variant="secondary" className="rounded-sm px-1 font-normal">
										{localSelectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => localSelectedValues.has(option.value))
										.map((option) => (
											<Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto min-w-[200px] max-w-[180px] md:max-w-max p-0" align="start">
				<Command>
					<CommandInput placeholder={`Search ${title}`} />
					<CommandList>
						<ScrollArea className="h-72">
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{options.map((option) => {
									const isSelected = localSelectedValues.has(option.value);
									return (
										<CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
											<div
												className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
													isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
												}`}
											>
												<CheckIcon className="h-4 w-4" />
											</div>
											{option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
											<span>{option.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
							{localSelectedValues.size > 0 && (
								<>
									<CommandSeparator />
									<CommandGroup>
										<CommandItem onSelect={clearFilters} className="justify-center text-center">
											Clear filters
										</CommandItem>
									</CommandGroup>
								</>
							)}
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
