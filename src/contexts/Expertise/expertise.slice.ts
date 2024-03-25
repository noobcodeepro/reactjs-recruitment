import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../lib/firebase";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IExpertise } from "../../type/expertise.type";

interface IState {
	expertises: IExpertise[];
	isLoading: boolean;
}

const initialState: IState = {
	expertises: [],
	isLoading: false,
};

export const expertiseCollection = collection(db, "expertises");

export const getExpertises = createAsyncThunk<IExpertise[]>(
	"expertises/get",
	async () => {
		const data = await getDocs(expertiseCollection);

		const filteredData = data.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id } as IExpertise),
		);

		return filteredData;
	},
);

export const getExpertise = createAsyncThunk(
	"expertise/get",
	async (id: string) => {
		const docRef = await getDoc(doc(db, `/expertises/${id}`));
		return docRef.data();
	},
);

export const expertiseSlice = createSlice({
	name: "expertise",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getExpertises.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getExpertises.fulfilled, (state, action) => {
				state.expertises = action.payload;
				state.isLoading = false;
			}),
});

export default expertiseSlice.reducer;
