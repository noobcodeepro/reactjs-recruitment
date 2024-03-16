import { CaretDownFilled, CheckOutlined } from "@ant-design/icons";
import { Select as AntdSelect } from "antd";
import React from "react";
import { SelectProps } from "antd/es/select";

const Select = (props: SelectProps) => {
	return (
		<AntdSelect
			menuItemSelectedIcon={
				<CheckOutlined
					style={{ fontSize: "20px", color: "#f26d21" }}
				/>
			}
			suffixIcon={<CaretDownFilled style={{ fontSize: "16px" }} />}
			{...props}
		></AntdSelect>
	);
};
export default Select;
