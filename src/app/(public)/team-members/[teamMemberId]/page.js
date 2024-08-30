import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import styles from "./styles.module.css";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { FaEdit, FaUserEdit, FaWhatsapp } from "react-icons/fa";

import AppMaxWidthContainer from "@/components/ui/max-width-container";
import ImageGallery from "@/components/ImageGallery";
import SocialShare from "@/components/ui/social-share";
import TeamMemberMoreInfo from "./MoreInfo";
import UploadGalleryDialog from "./UploadGalleryDialog";
import AudioReelsDialog from "./AudioReelsDialog";
import ShowReelsDialog from "./ShowReelsDialog";
import CarrierSummaryChart from "./_components/carrier-summary-chart";
import AudioReels from "./AudioReels";
import ShowReels from "./ShowReels";

import { getCurrentUser } from "@/app/actions/userAuth";
import { getTeamMemberDetails } from "@/app/actions/team_members";
import { getTeamMemberTrainings } from "@/app/actions/teamMemberTrainings";
import { getTeamMemberFilmographies } from "@/app/actions/teamFilmography";
import { getAllGalleryImages } from "@/app/actions/gallery-images";
import { getAllShowReels } from "@/app/actions/teamMemberShowReels";
import { getAudioReels } from "@/app/actions/audio-reels";
import Reviews from "./Reviews";
import { getTeamMemberReviews } from "@/app/actions/review";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Edit, Edit2, Edit2Icon, Edit3, Edit3Icon, EditIcon, FileEditIcon, Play } from "lucide-react";
import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FcEditImage } from "react-icons/fc";
import IntroVideoDialog from "./_components/intro-video-dialog";

export default async function TeamMemberDetails({ params }) {
	const user = await getCurrentUser();
	let uid;
	if (user) {
		uid = user.uid;
	}
	const { teamMemberId } = params;
	const teamMember = await getTeamMemberDetails(teamMemberId);
	const trainings = await getTeamMemberTrainings(teamMemberId);
	const filmographies = await getTeamMemberFilmographies(teamMemberId);
	const audioReels = await getAudioReels(teamMemberId);
	const showReels = await getAllShowReels(teamMemberId);
	const galleryImages = await getAllGalleryImages(teamMemberId);
	const teamMemberReviews = await getTeamMemberReviews(teamMemberId);

	return (
		<div className="bg-black text-[#ffffffcc] py-12 md:pt-28 pb-10">
			<AppMaxWidthContainer>
				<div className="flex flex-col lg:flex-row gap-10">
					<div className="relative rounded-md max-w-[300px]">
						<Image
							src={teamMember.profileImage || "/profile_pictures/team_member_profile_placeholder.png"}
							width={300}
							height={400}
							alt="Profile Picture"
							decoding="async"
							className="aspect-[3/4] h-fit w-full object-cover transition-all hover:scale-105"
						></Image>

						<div className="flex flex-col gap-4 absolute top-[40%] right-[-15px]">
							<IntroVideoDialog />
							{uid && uid === teamMemberId && (
								<Button variant="outline" size="icon" asChild>
									<Link href="/account/profile/team-profile">
										<Edit2 className="h-4 w-4" />
									</Link>
								</Button>
							)}
						</div>
					</div>
					<div className="flex flex-col flex-1 justify-center items-start gap-6">
						<div className="flex flex-col justify-start items-start gap-4">
							<div className="flex flex-wrap gap-2">
								{teamMember.filmDepartments?.map((filmDepartment) => (
									<Badge key={filmDepartment} variant="secondary" className={`capitalize`}>
										{filmDepartment}
									</Badge>
								))}
							</div>
							<h1 className={`${styles.strokeHeading} text-5xl md:text-8xl text-white font-bold`}>
								{teamMember.firstName} {teamMember.lastName}
							</h1>
						</div>
						<div className="flex gap-2">
							<a href={`https://wa.me/12345678890`} target="_blank" rel="noopener noreferrer" variant="link" className="flex p-0 m-0 mr-10">
								Whatsapp
								<FaWhatsapp className="h-5 w-5 ml-2" />
							</a>
							<SocialShare url="https://teamforfilm.vercel.app/" title={teamMember.firstName} hashtag="" />
						</div>
						<div className="flex flex-wrap justify-between md:justify-start w-full gap-6">
							<DetailBox containerClass="flex flex-col gap-3" heading="Age" subHeading={teamMember.ageGroup} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Height" subHeading={teamMember.height} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Ethnicity" subHeading={teamMember.ethnicity} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Nationality" subHeading={teamMember.nationality} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Location" subHeading={teamMember.location} />
						</div>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<h6 className={`${styles.smallHeading}`}>Carrier Summary</h6>
								</AccordionTrigger>
								<AccordionContent>
									<CarrierSummaryChart teamMember={teamMember} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									<h6 className={`${styles.smallHeading}`}>Trainings</h6>
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-6 pl-5">
										{!trainings.error ? (
											trainings?.map((training) => (
												<div className="flex flex-col" key={training.id}>
													<div className="text-sm">Course : {training.courseTaken}</div>
													<div className="text-sm">Length : {training.courseLength}</div>
													<div className="text-sm">Mentor : {training.mentor}</div>
													<div className="text-sm">Instituition : {training.instituition}</div>
												</div>
											))
										) : (
											<>No record</>
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									<h6 className={`${styles.smallHeading}`}>Skills</h6>
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-2 pl-5">
										<h6 className={`text-sm`}>Language Skills</h6>
										<div className="flex flex-wrap gap-2">
											{teamMember.languageSkills?.map((languageSkill) => (
												<Badge key={languageSkill} variant="secondary" className="capitalize">
													{languageSkill}
												</Badge>
											))}
										</div>
										<h6 className={`test-sm`}>Additional Skills</h6>
										<div className="flex flex-wrap gap-2">
											{teamMember.additionalSkills?.map((additionalSkill) => (
												<Badge key={additionalSkill} variant="secondary" className="capitalize">
													{additionalSkill}
												</Badge>
											))}
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<TeamMemberMoreInfo teamMember={teamMember} filmographies={filmographies} />
					</div>
				</div>
			</AppMaxWidthContainer>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex justify-between items-center">
							<div className="flex flex-col">
								<span className={`${styles.titleHeading}`}>Vocal/Music</span>
								<h1 className={`${styles.heading} text-4xl`}>
									My <span className={`${styles.textHGradient}`}>AUDIOREELS</span>
								</h1>
							</div>
							{uid && uid === teamMemberId ? <AudioReelsDialog teamMemberId={teamMemberId} /> : null}
						</div>
						<div className={`flex justify-between gap-5`}>
							<AudioReels uid={uid} teamMemberId={teamMemberId} audioReels={audioReels} />
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex justify-between items-center">
							<div className="flex flex-col">
								<span className={`${styles.titleHeading}`}>GALLERY</span>
								<h1 className={`${styles.heading} text-4xl`}>
									My <span className={`${styles.textHGradient}`}>GALLERY</span>
								</h1>
							</div>
							{uid && uid === teamMemberId ? <UploadGalleryDialog teamMemberId={teamMemberId} galleryImages={galleryImages} /> : null}
						</div>
						<div className={`flex flex-col`}>
							<ImageGallery uid={uid} galleryImages={galleryImages} teamMemberId={teamMemberId} />
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex justify-between items-center">
							<div className="flex flex-col">
								<span className={`${styles.titleHeading}`}>SHOWREELS</span>
								<h1 className={`${styles.heading} text-4xl`}>
									My <span className={`${styles.textHGradient}`}>SHOWREELS</span>
								</h1>
							</div>
							{uid && uid === teamMemberId ? <ShowReelsDialog teamMemberId={teamMemberId} /> : null}
						</div>
						<div className={`flex justify-center gap-5`}>
							<ShowReels uid={uid} teamMemberId={teamMemberId} showReels={showReels} />
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>REVIEWS</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>REVIEWS</span>
							</h1>
						</div>
						<Reviews uid={uid} teamMemberId={teamMemberId} teamMemberReviews={teamMemberReviews} />
					</div>
				</AppMaxWidthContainer>
			</div>
		</div>
	);
}

function DetailBox({ containerClass, heading, subHeading }) {
	return (
		<div className={containerClass && "flex flex-col gap-1"}>
			<h6 className={`${styles.smallHeading} text-white`}>{heading}</h6>
			<div className="text-base leading-tight text-muted-foreground font-normal">{subHeading}</div>
		</div>
	);
}
