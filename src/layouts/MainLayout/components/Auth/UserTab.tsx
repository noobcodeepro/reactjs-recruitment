import { Avatar, Button, Dropdown, MenuProps, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
	RootState,
	useAppDispatch,
} from "../../../../contexts/store";
import { logOut } from "../../../../contexts/Auth/auth.slice";
import { LogoutOutlined } from "@ant-design/icons";
import { Logout } from "../../../../icons";

const UserTab = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const isLoading = useSelector(
		(state: RootState) => state.auth.isLoading,
	);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		console.log("Start logout");

		dispatch(logOut());
	};
	const items: MenuProps["items"] = [
		{
			key: "logout",
			icon: <Logout stroke="#fff" />,
			className: "btn btn-primary text-white",
			label: (
				<div
					className="text-white text-xl font-semibold"
					onClick={handleLogout}
				>
					Đăng xuất
				</div>
			),
		},
	];

	return (
		<>
			{user && (
				<Dropdown
					className="py-3 pr-2 text-white w-[160px]"
					menu={{ items }}
					placement="bottom"
					arrow
				>
					<Button
						icon={
							<Avatar>
								{user.email ? user.email[0].toUpperCase() : ""}
							</Avatar>
						}
						className="flex items-center h-[54px] ml-4 bg-primary text-base"
					>
						<div className="w-20 overflow-hidden font-semibold text-xl">
							{user.email ? user.email.split("@")[0] : ""}
						</div>
					</Button>
				</Dropdown>
			)}
			{isLoading && (
				<Modal
					centered
					title="Basic Modal"
					open={isLoading}
					footer={null}
				>
					<p>Loading...</p>
				</Modal>
			)}
		</>
	);
};

export default UserTab;
