import React from "react";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store";

const MainLayout = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<>
			{user ? (
				<div>
					<Header />
					<div className="w-full bg-smoke">
						<div className="mt-[102px] container mx-auto min-h-screen ">
							<div className="pt-[44px] px-24">
								<Outlet />
							</div>
						</div>
					</div>
					<Footer />
				</div>
			) : (
				<>
					<Navigate to="/login" />
				</>
			)}
		</>
	);
};

export default MainLayout;
