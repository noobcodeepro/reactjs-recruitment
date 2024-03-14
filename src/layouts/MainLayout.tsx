import React from "react";
import Header from "./MainLayout/Header";
import { Outlet } from "react-router-dom";
import Footer from "./MainLayout/Footer";

const MainLayout = () => {
	return (
		<div>
			<Header />
			<div className="w-full bg-smoke">
				<div className="mt-[102px] container mx-auto flex items-center gap-44 min-h-screen ">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
