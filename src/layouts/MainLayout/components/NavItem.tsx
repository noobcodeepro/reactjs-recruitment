import React from "react";
import { NavItemType } from "../Header";
import { Link } from "react-router-dom";
import { RootState } from "../../../contexts/store";
import { useSelector } from "react-redux";

const NavItem = ({
	NavItem,
	isSelected,
}: {
	NavItem: NavItemType;
	isSelected?: boolean;
}) => {
	const userRole = useSelector(
		(state: RootState) => state.auth.others?.role,
	);

	return (
		<Link
			to={NavItem?.to || ""}
			hidden={userRole !== NavItem.role}
			className="py-4 lg:py-0"
		>
			<div
				className={`flex gap-2 items-center relative ${
					isSelected ? "text-primary" : "text-gray"
				}`}
			>
				<div className="">{NavItem.icon}</div>
				<div>{NavItem.label}</div>

				{isSelected && (
					<div className="absolute top-7 left-0 right-0 hidden lg:block">
						<div className="w-2 h-2 bg-primary rounded-full mx-auto"></div>
					</div>
				)}
			</div>
		</Link>
	);
};

export default NavItem;
