"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";

export default function IntroVideoDialog({ openDialog, onClose, videoUrl }) {
	const [open, setOpenDialog] = useState(openDialog);

	useEffect(() => {
		setOpenDialog(openDialog);
	}, [openDialog]);

	videoUrl = "https://www.youtube.com/watch?v=ZVnjOPwW4ZA";

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Play className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="aspect-video min-w-[70%]">
				<DialogHeader>
					<DialogTitle className="text-center">Add Portfolio / Showreel</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="aspect-video min-w-full">
					<ReactPlayer url={videoUrl} playing={false} controls width="100%" className="aspect-video" />
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
