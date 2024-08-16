"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";

export async function getAllCompanies() {
	try {
		const companiesRef = adminDb.collection("companies");
		const snapshot = await companiesRef.get();

		if (snapshot.empty) {
			return { error: "No companies found" };
		}

		const companies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return { data: JSON.parse(JSON.stringify(companies)) };
	} catch (error) {
		return { error: error.message };
	}
}

export async function getCompanyProfile(companyId) {
	try {
		const companyRef = adminDb.collection("companies").doc(companyId);
		const companyDoc = await companyRef.get();

		if (!companyDoc.exists) {
			return { error: "Company Profile not found" };
		}

		const companyDetails = companyDoc.data();

		return JSON.parse(JSON.stringify(companyDetails));
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveCompanyDetails(companyId, data) {
	try {
		const companyRef = adminDb.collection("companies").doc(companyId);
		const response = await companyRef.set(data, { merge: true });

		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export async function updateCompany(companyId, data) {
	try {
		if (!companyId) {
			return { success: false, message: "CompanyId is required" };
		}

		await adminDb
			.collection("companies")
			.doc(companyId)
			.update({
				...data,
				updatedAt: FieldValue.serverTimestamp(),
			});
		return { success: true, message: "Company Details updated" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function addTeamMemberToShortList(companyId, teamMemberId) {
	try {
		if (!companyId || !teamMemberId) {
			return { success: false, message: "CompanyId and teamMemberId is required" };
		}

		await adminDb
			.collection("companies")
			.doc(companyId)
			.update({
				bookmarkedTeamMember: FieldValue.arrayUnion(teamMemberId),
			});

		return { success: true, message: "Saved!" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function removeTeamMemberToShortList(companyId, teamMemberId) {
	try {
		if (!companyId || !teamMemberId) {
			return { success: false, message: "CompanyId and teamMemberId is required" };
		}

		await adminDb
			.collection("companies")
			.doc(companyId)
			.update({
				bookmarkedTeamMember: FieldValue.arrayRemove(teamMemberId),
			});

		return { success: true, message: "Removed !" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function getAllSavedTeamMembers(companyId) {
	try {
		if (!companyId) {
			return { error: "CompanyId is required" };
		}

		const ref = adminDb.collection("companies").doc(companyId);
		const doc = await ref.get();

		if (!doc.exists) {
			return { error: `Company with ID ${teamMemberId} not found.` };
		}

		const bookmarkedTeamMember = doc.data()?.bookmarkedTeamMember || [];

		if (!Array.isArray(bookmarkedTeamMember)) {
			return { error: "Invalid format for bookmarked TeamMembers." };
		}

		if (bookmarkedTeamMember.length === 0) {
			return [];
		}

		const teamMemberPromises = bookmarkedTeamMember.map(async (teamMemberId) => {
			if (!companyId) {
				console.warn(`Invalid job post data for team member ${teamMemberId}: `, { companyId });
				return null;
			}

			const teamMemberRef = adminDb.doc(`team_members/${teamMemberId}`);
			const teamMembertDoc = await teamMemberRef.get();

			if (!teamMembertDoc.exists) {
				return null;
			}

			return { id: teamMemberId, ...teamMembertDoc.data() };
		});

		const teamMembers = (await Promise.all(teamMemberPromises)).filter(Boolean);
		return JSON.parse(JSON.stringify(teamMembers));
	} catch (error) {
		return { error: error.message };
	}
}
