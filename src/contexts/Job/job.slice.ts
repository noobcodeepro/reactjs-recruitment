import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { db, storage } from "../../lib/firebase";

import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	startAt,
	updateDoc,
	where,
} from "firebase/firestore";
import { IJob } from "../../type/job.type";
import { getDownloadURL, ref } from "firebase/storage";

interface IState {
	jobs: IJob[];
	isLoading: boolean;
	edittingJob: IJob | null;
}

const initialState: IState = {
	jobs: [],
	edittingJob: null,
	isLoading: false,
};

export const jobCollection = collection(db, "jobs");

export const getJobs = createAsyncThunk<
	IJob[],
	{ q?: string; factoryId?: string; expertiseId?: string }
>(
	"jobs/get",
	async ({
		q,
		factoryId,
		expertiseId,
	}: {
		q?: string;
		factoryId?: string;
		expertiseId?: string;
	}) => {
		let jobQuery = query(jobCollection);

		// Áp dụng bộ lọc nếu có

		if (factoryId) {
			jobQuery = query(jobQuery, where("factoryId", "==", factoryId));
		}
		if (expertiseId) {
			jobQuery = query(
				jobQuery,
				where("expertise", "==", expertiseId),
			);
		}
		let querySnapshot = (await getDocs(jobQuery)).docs;
		if (q) {
			querySnapshot = querySnapshot.filter((d) =>
				d.data().name.toLowerCase().includes(q?.toLowerCase()),
			);
		}
		const factoriesWithImages = await Promise.all(
			querySnapshot.map(async (d) => {
				let photoUrl = "";
				const factoryRef = doc(
					db,
					`/factories/${d.data().factoryId}`,
				);
				const factoryData = (await getDoc(factoryRef)).data();
				try {
					const fileRef = ref(
						storage,
						`factories/${d.data().factoryId}.png`,
					);
					if (fileRef) {
						photoUrl = (await getDownloadURL(fileRef)) || "";
					}
				} catch (error) {
					photoUrl = "";
				}

				return {
					...d.data(),
					id: d.id,
					factory: {
						...factoryData,
						photoUrl,
					},
				} as IJob;
			}),
		);
		return factoriesWithImages;
	},
);

export const getJob = createAsyncThunk(
	"job/get",
	async (id: string) => {
		const docRef = await getDoc(doc(db, `/jobs/${id}`));
		return docRef.data();
	},
);

export const addJob = createAsyncThunk(
	"jobs/add",
	async (item: Omit<IJob, "id">) => {
		try {
			const docRef = await addDoc(jobCollection, item);
			return { id: docRef.id, ...item };
		} catch (error) {
			console.log(error);
		}
	},
);

export const updateJob = createAsyncThunk(
	"jobs/update",
	async ({ item, id }: { item: Omit<IJob, "id">; id: string }) => {
		const docRef = doc(db, `/jobs/${id}`);

		await updateDoc(docRef, item);

		return {
			...item,
			id: docRef.id,
		};
	},
);

export const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {
		startEdittingJob: (state, action: PayloadAction<IJob>) => {
			state.edittingJob = action.payload;
		},
		cancelEdittingFJob: (state) => {
			state.edittingJob = null;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getJobs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getJobs.fulfilled, (state, action) => {
				state.jobs = action.payload;
				state.isLoading = false;
			})
			.addCase(addJob.fulfilled, (state) => {
				state.edittingJob = null;
			})
			.addCase(updateJob.fulfilled, (state, action) => {
				state.edittingJob = null;
				state.jobs.find((item, index) => {
					if (item.id === action.payload.id) {
						state.jobs[index] = action.payload;
						return true;
					}
					return false;
				});
			}),
});

// Action creators are generated for each case reducer function

export default jobSlice.reducer;

export const { startEdittingJob, cancelEdittingFJob } =
	jobSlice.actions;
