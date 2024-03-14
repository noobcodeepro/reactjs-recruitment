import React from "react";
import { NavItemType } from "../Header";
import { Link } from "react-router-dom";
import { RootState } from "../../../contexts/store";
import { useSelector } from "react-redux";

const NavItem = ({ NavItem }: { NavItem: NavItemType }) => {
	const userRole = useSelector(
		(state: RootState) => state.auth.others?.role,
	);

	return (
		<Link to={NavItem?.to || ""} hidden={userRole !== NavItem.role}>
			<div className="flex gap-2 items-center text-gray">
				<div className="">{NavItem.icon}</div>
				<div>{NavItem.label}</div>
			</div>
		</Link>
	);
};

export default NavItem;
