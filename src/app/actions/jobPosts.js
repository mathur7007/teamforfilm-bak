"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { JobPostFormSchema } from "@/schemas/Schemas";

export async function getAllJobPosts() {
	try {
		const companiesRef = adminDb.collection("companies");
		const companiesSnapshot = await companiesRef.get();

		let allJobPosts = [];

		for (const companyDoc of companiesSnapshot.docs) {
			const companyId = companyDoc.id;
			const jobPostsRef = companiesRef.doc(companyId).collection("job_posts");
			const jobPostsSnapshot = await jobPostsRef.get();

			const jobPosts = jobPostsSnapshot.docs.map((doc) => ({
				id: doc.id,
				companyId,
				...doc.data(),
			}));
			allJobPosts = [...allJobPosts, ...jobPosts];
		}

		return { data: JSON.parse(JSON.stringify(allJobPosts)) };
	} catch (error) {
		return { error: error.message };
	}
}

export async function getCompanyJobPost(companyId) {
	try {
		const jobPostsRef = adminDb.collection("companies").doc(companyId).collection("job_posts");
		const jobPostsSnapshot = await jobPostsRef.get();

		let allJobPosts = [];

		const jobPosts = jobPostsSnapshot.docs.map((doc) => ({
			id: doc.id,
			companyId,
			...doc.data(),
		}));

		allJobPosts = [...allJobPosts, ...jobPosts];

		return JSON.parse(JSON.stringify(allJobPosts));
	} catch (error) {
		return { error: error.message };
	}
}

export async function getJobPost(companyId, jobPostId) {
	try {
		if (!companyId || !jobPostId) {
			return { error: "companyId and jobPostId are required" };
		}

		const companyRef = adminDb.collection("companies").doc(companyId);
		const companyDoc = await companyRef.get();

		if (!companyDoc.exists) {
			return { error: "company not found" };
		}

		const jobPostRef = adminDb.collection("companies").doc(companyId).collection("job_posts").doc(jobPostId);
		const jobPostDoc = await jobPostRef.get();

		if (!jobPostDoc.exists) {
			return { error: "Job post not found" };
		}

		const jobPost = { companyDetails: companyDoc.data(), ...jobPostDoc.data() };

		return JSON.parse(JSON.stringify(jobPost));
	} catch (error) {
		return { error: error.message };
	}
}

export async function addJobPost(uid, jobData) {
	try {
		const parsedData = JobPostFormSchema.parse(jobData);

		const jobPostsRef = adminDb.collection("companies").doc(uid).collection("job_posts");

		const jobDocRef = jobPostsRef.doc();

		const jobDataWithTimestamp = {
			...parsedData,
			createdAt: FieldValue.serverTimestamp(),
		};

		await jobDocRef.set(jobDataWithTimestamp);

		return { success: true, jobId: jobDocRef.id, message: "Job Saved" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function editJobPost(companyId, jobId, jobData) {
	try {
		const parsedData = JobPostFormSchema.parse(jobData);

		await adminDb
			.collection("companies")
			.doc(companyId)
			.collection("job_posts")
			.doc(jobId)
			.update({
				...parsedData,
				updatedAt: FieldValue.serverTimestamp(),
			});

		return { success: true, message: "Job Saved" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}
