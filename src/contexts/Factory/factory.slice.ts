import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { db } from "../../lib/firebase";

import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { IFactory } from "../../type/factory.type";

interface IState {
	factories: IFactory[];
	isLoading: boolean;
	editingFactory: IFactory | null;
}

const initialState: IState = {
	factories: [],
	editingFactory: null,
	isLoading: false,
};

export const factoryCollection = collection(db, "factories");

export const getFactories = createAsyncThunk<Array<IFactory>>(
	"factories/get",
	async () => {
		const data = await getDocs(factoryCollection);

		const filteredData = data.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id } as IFactory),
		);

		return filteredData;
	},
);

export const getFactory = createAsyncThunk(
	"factory/get",
	async (id: string) => {
		const docRef = await getDoc(doc(db, `/factories/${id}`));
		return docRef.data();
	},
);

export const addFactory = createAsyncThunk(
	"factories/add",
	async (item: Omit<IFactory, "id">) => {
		try {
			const docRef = await addDoc(factoryCollection, item);
			return { id: docRef.id, ...item };
		} catch (error) {
			console.log(error);
		}
	},
);

export const updateFactory = createAsyncThunk(
	"factories/update",
	async ({
		item,
		id,
	}: {
		item: Omit<IFactory, "id">;
		id: string;
	}) => {
		const docRef = doc(db, `/factories/${id}`);

		await updateDoc(docRef, item);

		return {
			...item,
			id: docRef.id,
		};
	},
);

export const factorySlice = createSlice({
	name: "factory",
	initialState,
	reducers: {
		startEdittingFactory: (
			state,
			action: PayloadAction<IFactory>,
		) => {
			state.editingFactory = action.payload;
		},
		cancelEdittingFactory: (state) => {
			state.editingFactory = null;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getFactories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFactories.fulfilled, (state, action) => {
				state.factories = action.payload;
				state.isLoading = false;
			})
			.addCase(addFactory.fulfilled, (state) => {
				state.editingFactory = null;
			})
			.addCase(updateFactory.fulfilled, (state, action) => {
				state.editingFactory = null;
				state.factories.find((item, index) => {
					if (item.id === action.payload.id) {
						state.factories[index] = action.payload;
						return true;
					}
					return false;
				});
			}),
});

// Action creators are generated for each case reducer function

export default factorySlice.reducer;

export const { startEdittingFactory, cancelEdittingFactory } =
	factorySlice.actions;
