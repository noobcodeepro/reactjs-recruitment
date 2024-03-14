import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import {
	User,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { message } from "antd";
import { doc, getDoc } from "firebase/firestore";

// interface IUser {
//   username?: string | undefined;
//   email: string;
//   uid: string;
//   avatarUrl?: string;
// }

interface UserType {
	user: User | null;
	others: OtherUserType | undefined;
	isEditing: boolean;
	isLoading: boolean;
}

interface OtherUserType {
	role: "enterprise" | "student";
	birthDay: number | 0;
	phoneNumber: string | "";
}
const userStorage = localStorage.getItem("USER_INFO") || "";

const initialState: UserType = {
	user: userStorage
		? (JSON.parse(userStorage) as User)
		: null || auth.currentUser,
	isEditing: false,
	isLoading: false,
	others: { role: "student", birthDay: 0, phoneNumber: "" },
};

export const getUser = createAsyncThunk<UserType>(
	"auth/getUser",
	async () => {
		const user = await auth.currentUser;
		let otherFields: OtherUserType | undefined = undefined;

		// Additional infomation query
		if (user) {
			const userDoc = await doc(db, "users", user.uid);
			await getDoc(userDoc).then((res) => {
				otherFields = res.data() as OtherUserType;
			});
		}
		return {
			user: user,
			isEditing: false,
			isLoading: false,
			others: otherFields,
		} as UserType;
	},
);

// Login function
export const authLogin = createAsyncThunk(
	"auth/login",
	async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		return await signInWithEmailAndPassword(auth, email, password);
	},
);

// Logout
export const logOut = createAsyncThunk("auth/logOut", async () => {
	return await signOut(auth);
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		authLogin: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(authLogin.fulfilled, (state, action) => {
				if (
					action.payload.user.email &&
					action.payload.user.displayName
				) {
					state.user = action.payload.user;
					state.isLoading = false;
					return;
				}
			})
			.addCase(getUser.fulfilled, (state, action) => {
				if (action.payload.user) {
					state.user = action.payload.user;
				}

				if (action.payload.others) {
					const data = action.payload.others;
					state.others = data;
				}
				// return action.payload.otherFields;
			})
			.addCase(authLogin.rejected, (_, action) => {
				const error = {
					message: "",
				};
				switch (action.error.code) {
					case "auth/invalid-email":
						error.message = "Email không hợp lệ";
						break;
					case "auth/invalid-credential":
						error.message = "Email và mật khẩu không đúng";
						break;
					default:
						error.message = "Enexpected error";
						break;
				}
				throw error;
			})

			.addCase(logOut.fulfilled, (state, action) => {
				if (action.type === "auth/logOut/fulfilled") {
					message.info("Logout!");
				}
				state.user = null;
				localStorage.removeItem("USER_INFO");
			}),
});

// Action creators are generated for each case reducer function
export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
