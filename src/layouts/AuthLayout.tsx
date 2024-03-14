import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthHeader, SidePoster } from "../layouts/Auth/index";
import { useSelector } from "react-redux";
import { RootState } from "../contexts/store";

const AuthLayout = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const navigate = useNavigate();
	// useEffect(() => {
	// 	if (!user) {
	// 		navigate("/jd");
	// 	}
	// }, [user, navigate]);
	return (
		<>
			{user ? (
				<></>
			) : (
				<>
					<div className="w-full min-h-screen bg-[#F1F3F5]">
						<div className="container mx-auto py-6 px-24">
							<AuthHeader />
							<div className="mt-[132px] container mx-auto flex items-center gap-44">
								<div className="w-[524px]">
									<Outlet />
								</div>
								<div className="">
									<SidePoster />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AuthLayout;
export {};
