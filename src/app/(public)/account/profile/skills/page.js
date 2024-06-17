import { TeamMemberBasicInfoForm } from "@/components/Forms/Account/TeamMemberBasicInfoForm";
import { Separator } from "@/components/ui/separator";

export default function Skills() {
	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Basic Info</h3>
					<p className="text-sm text-muted-foreground">Complete your basic TeamMember Basic Info.</p>
				</div>
				<Separator />
				<TeamMemberBasicInfoForm />
			</div>
		</>
	);
}
