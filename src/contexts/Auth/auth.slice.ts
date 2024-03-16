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
	others: OtherUserType;
	isEditing: boolean;
	isLoading: boolean;
}

interface OtherUserType {
	role: "enterprise" | "student";
	birthDay: number | 0;
	phoneNumber: string | "";
}

const initialState: UserType = {
	user: auth.currentUser || null,
	isEditing: false,
	isLoading: false,
	others: { role: "student", birthDay: 0, phoneNumber: "" },
};

export const getUser = createAsyncThunk<User>(
	"auth/getUser",
	async () => {
		const user = await auth.currentUser;
		// Additional infomation query
		if (user) {
		}
		return user as User;
	},
);

// Login function
export const authLogin = createAsyncThunk(
	"auth/login",
	async ({
		email,
		password,
		role,
	}: {
		email: string;
		password: string;
		role?: "enterprise" | "student" | undefined;
	}) => {
		console.log("Start logging");

		const user = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);

		console.log("Loggin successfully");

		return {
			user: user,
			role: role as "enterprise" | "student",
		};
	},
);

// Logout
export const logOut = createAsyncThunk("auth/logOut", async () => {
	console.log("Logging out");

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
				if (action.payload.user.user) {
					state.user = action.payload.user.user;
					state.others.role = action.payload.role;
				}
			})
			.addCase(getUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.user = action.payload;
				}
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
					state.user = initialState.user;
					state.others = initialState.others;
				}
			}),
});

// Action creators are generated for each case reducer function
export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
