import React from "react";
import { Pagination as AntdPagination, ConfigProvider } from "antd";
import "./pagination.css";

const Pagination = ({
	pageSize,
	total,
	setCurrent,
}: {
	pageSize: number;
	total: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Pagination: {
						itemActiveBg: "#FF750680",
					},
				},
			}}
		>
			<div className="w-fit mx-auto py-3 mt-6">
				<AntdPagination
					defaultCurrent={1}
					pageSize={pageSize}
					total={total}
					onChange={(page) => {
						setCurrent(page);
					}}
				></AntdPagination>
			</div>
		</ConfigProvider>
	);
};

export default Pagination;
