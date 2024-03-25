import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { InputProps, SearchProps } from "antd/es/input";
import React from "react";

const SearchInput = (props: InputProps) => {
	return (
		<div className="flex items-center bg-white pl-4">
			<div>
				<SearchOutlined
					style={{ fontSize: "20px", color: "#F26D21" }}
				/>
			</div>
			<Input autoComplete="off" {...props} />
		</div>
	);
};

export default SearchInput;
