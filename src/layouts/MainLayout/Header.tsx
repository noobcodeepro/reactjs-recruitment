import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./components/NavItem";
import {
	FactoryRegister,
	FindDocument,
	FormEdit,
	UserSearch,
} from "../../icons/index";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store";
import UserTab from "./components/Auth/UserTab";

export type NavItemType = {
	label?: string;
	to?: string;
	icon?: ReactElement;
	role?: "enterprise" | "student";
};

const navItems: NavItemType[] = [
	{
		to: "/jd",
		icon: <UserSearch />,
		label: "Xem JD yêu cầu tuyển dụng",
		role: "student",
	},
	{
		to: "/jd-register",
		icon: <FormEdit />,
		label: "Đăng ký trực tuyến",
		role: "student",
	},
	{
		to: "/jd",
		icon: <FindDocument />,
		label: "Tìm kiếm việc làm",
		role: "enterprise",
	},
	{
		to: "/factory-register",
		icon: <FactoryRegister />,
		label: "Doanh nghiệp đăng ký",
		role: "enterprise",
	},
];
const Header = () => {
	const param = useLocation();

	const isSelectedNav = (navItem: NavItemType) => {
		if (navItem.to) {
			if (param.pathname.includes(navItem.to)) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	};
	return (
		<div className=" fixed top-0 left-0 right-0 bg-white z-10">
			<div className="container mx-auto flex items-center justify-between py-6 px-24">
				<div>
					<img
						src="/images/brand.jpg"
						alt="brand"
						className="h-[52px] object-contain"
					/>
				</div>

				<div className="flex gap-2 items-center">
					<div className="flex flex-1 items-center gap-x-6 ">
						{navItems.map((nav) => (
							<NavItem
								key={nav.label}
								NavItem={nav}
								isSelected={isSelectedNav(nav)}
							/>
						))}
					</div>

					<div>
						<UserTab />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;

export {};
