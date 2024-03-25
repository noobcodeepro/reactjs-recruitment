import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
	Button,
	Checkbox,
	Divider,
	Drawer,
	Form,
	Radio,
	RadioChangeEvent,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../contexts/store";
import { getExpertises } from "../../contexts/Expertise/expertise.slice";
import { getJobs } from "../../contexts/Job/job.slice";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from "../../components/Select/Select";
import { FilterOutline } from "../../icons";

const Filter = () => {
	const dispatch = useAppDispatch();
	const [form] = useForm();
	const factories = useSelector(
		(state: RootState) => state.factory.factories,
	);

	const onFinish = () => {
		const submitData = form.getFieldsValue();
		console.log(form.getFieldsValue());
		const q = submitData.jobSearch || "";
		const factoryId = submitData.factoryId || selectedFactory || "";

		// Re-use for mobile devices
		let expertiseMobile = "";
		if (expertiseChecklist && expertiseChecklist.length > 0) {
			expertiseMobile = expertiseChecklist[0];
		}
		const expertiseId =
			submitData.expertiseId || expertiseMobile || "";
		dispatch(getJobs({ q, factoryId, expertiseId }))
			.unwrap()
			.then(() => {
				onClose();
			});
	};

	const expertises = useSelector(
		(state: RootState) => state.expertise.expertises,
	);
	const fieldOptions: DefaultOptionType[] = expertises.map((e) => ({
		label: <div className="relative">{e.name}</div>,
		value: e.id,
	}));

	const facOptions: DefaultOptionType[] = factories.map((f) => ({
		label: <div className="relative">{f.name}</div>,
		value: f.id,
	}));

	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getExpertises());
	}, [dispatch]);

	// Mobile states:
	const [selectedFactory, setSelectedFactory] = useState<
		string | null
	>();

	const handleChangeFactoryMobile = (e: RadioChangeEvent) => {
		setSelectedFactory(e.target.value);
		console.log(selectedFactory);
	};

	const [expertiseChecklist, setExpertiseChecklist] =
		useState<string[]>();

	const onExpertiseChecklistChange = (list: string[]) => {
		setExpertiseChecklist(list);
	};
	return (
		<>
			{/* For pc devices */}
			<Form
				className="mb-0 hidden lg:block"
				onFinish={onFinish}
				form={form}
			>
				<div className="grid grid-cols-10 w-full p-[6px] divide-x-2 divide-[#EDEDED] bg-white">
					<div className="col-span-3">
						<Form.Item className="mb-0" name={"jobSearch"}>
							<SearchInput
								placeholder="Nhập vị trí muốn ứng tuyển"
								className="placeholder:text-base"
							/>
						</Form.Item>
					</div>
					<div className="col-span-3">
						<Form.Item className="mb-0" name={"expertiseId"}>
							<Select
								className="w-full"
								placeholder={
									<div className="text-black text-base">
										Chọn lĩnh vực chuyên môn
									</div>
								}
								options={fieldOptions}
							/>
						</Form.Item>
					</div>
					<div className="col-span-3">
						<Form.Item className="mb-0" name={"factoryId"}>
							<Select
								className="w-full"
								placeholder={
									<div className="text-black text-base">
										Chọn công ty
									</div>
								}
								options={facOptions}
							/>
						</Form.Item>
					</div>
					<div>
						<Button
							htmlType="submit"
							className="btn btn-primary p-0"
							icon={<SearchOutlined />}
						>
							Tìm việc
						</Button>
					</div>
				</div>
			</Form>

			{/* For mobile devices */}
			<Drawer
				style={{
					height: "554px",
				}}
				height={554}
				closable={false}
				placement="bottom"
				onClose={onClose}
				open={open}
				className="rounded-t-xl pt-0"
			>
				<div className="bg-gray h-1 w-[54px] mx-auto"></div>

				<Divider />
				<div className="font-semibold text-base text-[#4D4D4D] my-3">
					Chọn công ty
				</div>

				<div>
					<Radio.Group
						size="large"
						className="flex flex-wrap gap-2"
						onChange={handleChangeFactoryMobile}
						defaultValue=""
					>
						<Radio.Button
							value={""}
							className={` ${!selectedFactory ? "bg-primary" : ""}`}
						>
							Tất cả
						</Radio.Button>
						{factories.map((e) => (
							<Radio.Button
								key={e.id}
								className={`rounded-lg ${
									selectedFactory === e.id ? "bg-primary" : ""
								}`}
								value={e.id}
							>
								{e.name}
							</Radio.Button>
						))}
					</Radio.Group>
				</div>

				<div className="mt-5 mb-3 flex justify-between items-center">
					<div className="font-semibold text-base text-[#4D4D4D]">
						Chọn lĩnh vực chuyên môn
					</div>

					<div className="underline text-primary text-xs">
						Chọn tất cả
					</div>
				</div>

				<div>
					<Checkbox.Group
						onChange={onExpertiseChecklistChange}
						className="flex flex-col h-[240px] overflow-y-scroll gap-1"
					>
						{expertises.map((ex) => (
							<Checkbox
								key={ex.id}
								className="flex flex-row-reverse justify-between"
								value={ex.id}
							>
								{ex.name}
							</Checkbox>
						))}
					</Checkbox.Group>
				</div>

				<div className="flex items-center justify-center gap-2 mx-12">
					<Button
						onClick={onClose}
						size="large"
						className="btn btn-outline text-base font-semibold"
					>
						Hủy bỏ
					</Button>
					<Button
						onClick={onFinish}
						size="large"
						className="btn btn-primary text-base font-semibold"
					>
						Áp dụng
					</Button>
				</div>
			</Drawer>
			<div className="relative lg:hidden">
				<Form className="mb-0 block" onFinish={onFinish} form={form}>
					<div className="flex gap-x-4">
						<Form.Item className="mb-0 flex-1" name={"jobSearch"}>
							<SearchInput
								placeholder="Nhập vị trí muốn ứng tuyển"
								className="placeholder:text-sm lg:placeholder:text-base"
							/>
						</Form.Item>

						<Button
							onClick={() => setOpen(true)}
							className="btn btn-primary w-[74px] p-0 text-sm"
						>
							<div className="flex items-center justify-center gap-2 font-semibold">
								Lọc
								<FilterOutline />
							</div>
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Filter;
