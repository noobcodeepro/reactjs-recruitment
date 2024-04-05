import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthHeader, SidePoster } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store";

const AuthLayout = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const role = useSelector(
		(state: RootState) => state.auth.others.role,
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (role === "attendant") {
				navigate("/quiz");
			} else {
				navigate("/jd");
			}
		} else {
			navigate("/login");
		}
	}, []);
	return (
		<>
			{user?.email ? (
				<>
					{role === "attendant" ? (
						<Navigate to={"/quiz"} />
					) : (
						<Navigate to={"/jd"} />
					)}
				</>
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
