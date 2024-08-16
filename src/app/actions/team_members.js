"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { Filter } from "firebase-admin/firestore";

// Utility function to convert Firestore Timestamps to JavaScript Dates
const transformTimestamps = (doc) => {
	const data = doc.data();
	return {
		...data,
		createdAt: data.createdAt ? data.createdAt.toDate() : null,
		updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
	};
};

/**
 * Fetches all team members from the "team_members" collection.
 * Converts Firestore Timestamps to JavaScript Dates for client compatibility.
 * @returns {Promise<{ success: boolean, data?: Array, message?: string }>}
 */
export const getAllTeamMembers = async () => {
	try {
		const collectionRef = adminDb.collection("team_members");
		const snapshot = await collectionRef.get();

		if (snapshot.empty) {
			return { error: "No TeamMember found" };
		}

		const teamMembers = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
		return { data: JSON.parse(JSON.stringify(teamMembers)) };
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Fetches details of a specific team member by UID.
 * Converts Firestore Timestamps to JavaScript Dates for client compatibility.
 * @param {string} uid - The UID of the team member.
 * @returns {Promise<{ success: boolean, data?: object, message?: string }>}
 */
export const getTeamMemberDetails = async (uid) => {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const snapshot = await teamMemberRef.get();

		if (!snapshot.exists) {
			return { error: "No TeamMember data found" };
		}

		const teamMemberProfile = {
			uid: snapshot.id,
			...transformTimestamps(snapshot),
		};

		return JSON.parse(JSON.stringify(teamMemberProfile));
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Saves or updates a team member's profile details.
 * Adds `updatedAt` field to track the update time.
 * @param {string} uid - The UID of the team member.
 * @param {object} data - The profile data to be saved.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const saveTeamMemberDetails = async (uid, data) => {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const profileWithTimestamps = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await teamMemberRef.set(profileWithTimestamps, { merge: true });
		return { success: true, message: "Profile saved successfully" };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Adds a bookmark to a team member's `bookmarkedJobPosts` array.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} companyId - The company ID related to the job post.
 * @param {string} jobPostId - The job post ID to be bookmarked.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const addBookmarkToArray = async (teamMemberId, companyId, jobPostId) => {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(teamMemberId);
		await teamMemberRef.update({
			bookmarkedJobPosts: FieldValue.arrayUnion({ companyId, jobPostId }),
		});
		return { success: true };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Removes a bookmark from a team member's `bookmarkedJobPosts` array.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} companyId - The company ID related to the job post.
 * @param {string} jobPostId - The job post ID to be removed from bookmarks.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const removeBookmarkFromArray = async (teamMemberId, companyId, jobPostId) => {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(teamMemberId);
		await teamMemberRef.update({
			bookmarkedJobPosts: FieldValue.arrayRemove({ companyId, jobPostId }),
		});
		return { success: true };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Fetches bookmarked job posts for a given team member.
 *
 * @param {string} teamMemberId - The ID of the team member.
 * @returns {Promise<{ success: boolean, data?: Array, message?: string }>}
 */
export const getBookmarkedJobPosts = async (teamMemberId) => {
	if (!teamMemberId) {
		return { success: false, message: "Team member ID is required." };
	}

	try {
		const teamMemberRef = adminDb.collection("team_members").doc(teamMemberId);
		const teamMemberDoc = await teamMemberRef.get();

		if (!teamMemberDoc.exists) {
			return { success: false, message: `Team member with ID ${teamMemberId} not found.` };
		}

		const bookmarkedJobPosts = teamMemberDoc.data()?.bookmarkedJobPosts || [];

		if (!Array.isArray(bookmarkedJobPosts)) {
			return { success: false, message: "Invalid format for bookmarked job posts." };
		}

		if (bookmarkedJobPosts.length === 0) {
			return [];
		}

		const jobPostPromises = bookmarkedJobPosts.map(async ({ companyId, jobPostId }) => {
			if (!companyId || !jobPostId) {
				console.warn(`Invalid job post data for team member ${teamMemberId}: `, { companyId, jobPostId });
				return null;
			}

			const jobPostRef = adminDb.doc(`companies/${companyId}/job_posts/${jobPostId}`);
			const jobPostDoc = await jobPostRef.get();

			if (!jobPostDoc.exists) {
				return null;
			}

			return { id: jobPostId, companyId, ...jobPostDoc.data() };
		});

		const jobPosts = (await Promise.all(jobPostPromises)).filter(Boolean);
		return JSON.parse(JSON.stringify(jobPosts));
	} catch (error) {
		return { success: false, message: error.message };
	}
};
