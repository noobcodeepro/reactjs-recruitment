import React from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from "../../components/Select/Select";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/es/select";

const Filter = () => {
	const fieldOptions: DefaultOptionType[] = [
		{
			label: <div className="relative">Lập trình Front-end</div>,
			value: "ltfe",
		},
		{
			label: <div className="relative">Lập trình Back-end</div>,
			value: "ltbe",
		},
		{
			label: <div className="relative">VFX Artist</div>,
			value: "vfx",
		},
		{
			label: <div className="relative">UI/UX Design</div>,
			value: "uiuxd",
		},
	];

	const facOptions: DefaultOptionType[] = [
		{
			label: <div className="relative">Alta Software</div>,
			value: "altas",
		},
		{
			label: <div className="relative">Alta Plastic</div>,
			value: "altap",
		},
		{
			label: <div className="relative">Alta Media</div>,
			value: "altam",
		},
		{
			label: <div className="relative">Unigons</div>,
			value: "unigons",
		},
	];

	return (
		<div className="grid grid-cols-10 w-full p-[6px] divide-x-2 divide-[#EDEDED] bg-white">
			<div className="col-span-3">
				<SearchInput
					placeholder="Nhập vị trí muốn ứng tuyển"
					className="placeholder:text-base"
				/>
			</div>
			<div className="col-span-3">
				<Select
					className="w-full"
					placeholder={
						<div className="text-black text-base">
							Chọn lĩnh vực chuyên môn
						</div>
					}
					options={fieldOptions}
				/>
			</div>
			<div className="col-span-3">
				<Select
					className="w-full"
					placeholder={
						<div className="text-black text-base">Chọn công ty</div>
					}
					options={facOptions}
				/>
			</div>
			<div>
				<Button
					className="btn btn-primary p-0"
					icon={<SearchOutlined />}
				>
					Tìm việc
				</Button>
			</div>
		</div>
	);
};

export default Filter;
