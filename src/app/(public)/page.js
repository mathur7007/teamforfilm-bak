import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="text-white">
				<AppMaxWidthContainer>
					<div className="flex flex-col lg:flex-row justify-between gap-5 py-20">
						<div className="flex flex-col justify-center relative w-full lg:w-5/12 gap-2">
							<div className="text-lg font-bold">About</div>
							<div className="text-4xl font-bold">TEAMFORFILM.COM</div>
							<div className="text-base mt-4">
								TeamForFilm aspires to become a common home for Nepali film professionals and aspires to serve as a comprehensive database for the
								film industry. Recognizing the inherent challenges in locating suitable team members for film projects and the lack of platforms for
								emerging talents to exhibit their abilities, we have attempted to develope a platform to address these issues.
							</div>
						</div>
						<div className="flex flex-col justify-center relative w-full lg:w-7/12 max-w-[700px]">
							<Image src={"/images/resource/search-popup-from-laptop.png"} alt="" width={"700"} height={"100"}></Image>
						</div>
					</div>

					<div className="flex flex-col justify-between gap-4 py-20">
						<div className="text-4xl font-bold">OUR OBJECTIVE</div>
						<div className="text-base">
							Our goal is to create a platform where aspiring individuals can be easily discovered by filmmakers seeking talent, making the process of
							talent discovery effortless and efficient. Additionally, we facilitate the easy formation of film production teams, ensuring that
							filmmakers can quickly assemble the right talent for their projects with our advanced features.
						</div>
					</div>

					<div className="flex flex-col lg:flex-row justify-between gap-4 py-20">
						<div className="flex flex-col justify-center relative w-full lg:w-7/12 gap-2 max-w-[700px]">
							<Image src={"/images/resource/COMPREHENSIVE-PROFILE-2.png"} alt="" width={"700"} height={"100"}></Image>
						</div>
						<div className="flex flex-col justify-center relative w-full lg:w-5/12 gap-2">
							<div className="text-4xl font-bold">Swift assessment with Comprehensive Profiles</div>
							<div className="text-base mt-4">
								Each candidate within our platform maintains a comprehensive profile that encapsulates their skills, experience, and work samples.
								This feature enables filmmakers to evaluate a candidate’s details and skill levels efficiently.
							</div>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row justify-between gap-4 py-20">
						<div className="flex flex-col justify-center relative w-full lg:w-5/12 gap-2">
							<div className="text-4xl font-bold">Easy navigation through “ShowReels with Timestamps”</div>
							<div className="text-base mt-4">
								Candidates have the option to post video reels with timestamps, enabling filmmakers to swiftly navigate to the scenes featuring the
								candidates. This feature eliminates the need for filmmakers to view the entire video, thereby saving time.
							</div>
						</div>
						<div className="flex flex-col justify-center relative w-full lg:w-7/12 max-w-[700px]">
							<Image src={"/images/resource/timestamps-opt-2.png"} alt="" width={"700"} height={"100"}></Image>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row justify-between gap-2 py-20">
						<div className="flex flex-col justify-center relative w-full lg:w-7/12 gap-2 max-w-[600px]">
							<Image src={"/images/resource/CHARTS-2.png"} alt="" width={"600"} height={"100"}></Image>
						</div>
						<div className="flex flex-col justify-center relative w-full lg:w-5/12 gap-2">
							<div className="text-4xl font-bold">Quick analysis through “Career Summary Metrics”</div>
							<div className="text-base mt-4">
								The feature is designed to assist filmmakers in assessing a candidate’s level of experience and area of expertise. It also provides
								candidates with a platform to display their career trajectory and accomplishments.
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 py-20">
						<div className="text-4xl font-bold">Other Features</div>

						<div className="text-2xl font-bold">Online Audition Applications:</div>
						<div className="text-base mt-4">
							Streamline the audition process by submitting audition tapes and materials online. Easily apply for roles and showcase your talent to
							casting directors and production teams.
						</div>

						<div className="text-2xl font-bold">Post Online Call for Auditions:</div>
						<div className="text-base mt-4">
							Advertise casting calls and audition opportunities online. Invite aspiring actors and talents to submit their auditions digitally,
							facilitating a more efficient and accessible casting process.
						</div>

						<div className="text-2xl font-bold">Save Your Favorite Members:</div>
						<div className="text-base mt-4">
							Save profiles of fellow members and collaborators whom you admire or wish to work with. Build connections, exchange messages, and foster
							collaborations with ease.
						</div>

						<div className="text-2xl font-bold">Post Online About Your Required Team Members:</div>
						<div className="text-base mt-4">
							Broadcast your project requirements and collaboration opportunities online. Share details about your project, what you’re looking for in
							team members, and what you can offer in return. Invite interested individuals to join your creative endeavors.
						</div>

						<div className="text-2xl font-bold">User-Generated Reels Showcase:</div>
						<div className="text-base mt-4">
							Newcomers and aspiring filmmakers can share their self-made reels to showcase their talent, even if they haven’t worked professionally
							before. It’s an opportunity for budding artists to display their creativity and potential, gaining exposure and recognition within the
							filmmaking community.
						</div>
						<div className="text-base mt-4">
							Please note that while many features are fully functional, some are still in development. We’re continuously working to enhance your
							experience and provide even more valuable tools for your filmmaking journey. Your suggestions and valuable feedback are highly welcome.
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>
		</>
	);
}
