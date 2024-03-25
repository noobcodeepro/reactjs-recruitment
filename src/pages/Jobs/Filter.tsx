import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../contexts/store";
import { getExpertises } from "../../contexts/Expertise/expertise.slice";
import { getJobs } from "../../contexts/Job/job.slice";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from "../../components/Select/Select";

const Filter = () => {
	const dispatch = useAppDispatch();
	const factories = useSelector(
		(state: RootState) => state.factory.factories,
	);

	const [form] = useForm();

	const onFinish = () => {
		const submitData = form.getFieldsValue();
		console.log(form.getFieldsValue());
		const q = submitData.jobSearch || "";
		const factoryId = submitData.factoryId || "";
		const expertiseId = submitData.expertiseId || "";
		dispatch(getJobs({ q, factoryId, expertiseId }));
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

	useEffect(() => {
		dispatch(getExpertises());
	}, [dispatch]);
	return (
		<Form className="mb-0" onFinish={onFinish} form={form}>
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
	);
};

export default Filter;
