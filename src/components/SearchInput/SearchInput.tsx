import { Input } from "antd";
import { InputProps } from "antd/es/input";
import React from "react";
import { SearchOutline } from "../../icons";

const SearchInput = (props: InputProps) => {
	return (
		<div className="flex items-center bg-white pl-4 rounded-lg lg:rounded-none">
			<div>
				<SearchOutline />
			</div>
			<Input autoComplete="off" {...props} />
		</div>
	);
};

export default SearchInput;
