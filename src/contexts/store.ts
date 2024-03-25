import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
import { Tuple, configureStore } from "@reduxjs/toolkit";

import jobReducer from "./Job/job.slice";
import authReducer from "./Auth/auth.slice";
import factoryReducer from "./Factory/factory.slice";
import expertiseReducer from "./Expertise/expertise.slice";

const authPersistConfig = { key: "auth", storage };

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		factory: factoryReducer,
		job: jobReducer,
		expertise: expertiseReducer,
	},
	middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
