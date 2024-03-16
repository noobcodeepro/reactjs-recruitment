import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthHeader, SidePoster } from "../layouts/Auth/index";
import { useSelector } from "react-redux";
import { RootState } from "../contexts/store";

const AuthLayout = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	return (
		<>
			{user ? (
				<Navigate to={"/jd"} />
			) : (
				<>
					<div className="w-full min-h-screen bg-smoke">
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
