import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "./layouts/index";
import {
	ForgotPassword,
	Login,
	UpdatePassword,
} from "./pages/Auth/index";
import Welcome from "./pages/Welcome/Welcome";

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
				path: "/",
				element: <Navigate to={"/jd"} />,
			},
			{
				path: "/jd",
				element: <Welcome />,
			},
		],
	},
]);