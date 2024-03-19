import { Tuple, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/auth.slice";
import factoryReducer from "./Factory/factory.slice";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";
import {
	createStateSyncMiddleware,
	initMessageListener,
} from "redux-state-sync";
import persistStore from "redux-persist/es/persistStore";

const syncConfig = {
	// All actions will be triggered in other tabs except BLACKLIST
	blacklist: ["persist/PERSIST"],
};

const authPersistConfig = { key: "auth", storage };

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		factory: factoryReducer,
	},
	middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
