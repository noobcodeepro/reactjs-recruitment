import React from "react";

const Header = () => {
	return (
		<div className="fixed top-0 left-0 right-0 ">
			<div className="container mx-auto flex items-center justify-between py-6 px-24">
				<div>
					<img
						src="/images/brand.jpg"
						alt="brand"
						className="h-[52px] object-contain"
					/>
				</div>

				<div className="font-bold text-[28px] text-primary">
					HỆ THỐNG TUYỂN DỤNG <br /> VÀ QUẢN LÝ SINH VIÊN THỰC TẬP
				</div>
			</div>
		</div>
	);
};

export default Header;

export {};
