import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout, RootLayout } from "./layouts/index";
import Jobs from "./pages/Jobs/index";

import {
	ForgotPassword,
	Login,
	UpdatePassword,
} from "./pages/Auth/index";
import FactoryRegister from "./pages/Factory/FactoryRegister";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "/update-password",
				element: <UpdatePassword />,
			},
		],
	},
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/jd",
				element: <Jobs />,
			},
			{
				path: "/factory-register",
				element: <FactoryRegister />,
			},
		],
	},
]);
