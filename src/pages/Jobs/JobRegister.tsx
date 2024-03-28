import {
	CalendarOutlined,
	CloseCircleOutlined,
	CloudUploadOutlined,
	PlusOutlined,
	SendOutlined,
} from "@ant-design/icons";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { CalendarOutline, CloudUploadOutline } from "../../icons";
import { RootState, useAppDispatch } from "../../contexts/store";
import { getExpertises } from "../../contexts/Expertise/expertise.slice";
import { useSelector } from "react-redux";

const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const JobRegister = () => {
	const dispatch = useAppDispatch();
	const [form] = useForm();
	const expertises = useSelector(
		(state: RootState) => state.expertise.expertises,
	);
	useEffect(() => {
		dispatch(getExpertises());
	}, []);
	return (
		<div className="space-y-4">
			<div className="text-primary font-bold text-2xl lg:text-3xl uppercase">
				Điền thông tin đăng ký
			</div>

			<Form form={form} layout="vertical">
				<Form.Item
					label={
						<span>
							Chọn file<span className="text-red-400">*</span>
						</span>
					}
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload
						style={{ backgroundColor: "red" }}
						action="/upload.do"
						listType="picture-card"
					>
						<div className="flex flex-col justify-center items-center">
							<CloudUploadOutline />
							<Button
								size="small"
								className="btn btn-primary p-0 text-sm h-[35px] w-[138px] "
							>
								Chọn file
							</Button>
						</div>
					</Upload>
				</Form.Item>

				<div className="block lg:flex gap-12">
					<div className="lg:w-[524px]">
						<Form.Item name={"name"} label="Họ và tên">
							<Input placeholder="Nhập họ và tên" />
						</Form.Item>
						<Form.Item name={"dob"} label="Ngày sinh">
							<DatePicker
								removeIcon={<CloseCircleOutlined />}
								allowClear
								suffixIcon={<CalendarOutline />}
								placeholder="Nhập họ và tên"
							/>
						</Form.Item>
						<Form.Item
							name="expertiseId"
							label="Chọn vị trí ứng tuyển"
						>
							<Select>
								{expertises.map((e) => (
									<Select.Option value={e.id}>{e.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="email" label="Địa chỉ email">
							<Input placeholder="Nhập email" />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Điện thoại"
							className="mb-0"
						>
							<Input placeholder="Nhập số điện thoại" />
						</Form.Item>
					</div>

					<div className="lg:w-[524px]">
						<Form.Item name="school" label="Trường đang học">
							<Input placeholder="Nhập trường đang học" />
						</Form.Item>
						<Form.Item name="major" label="Chuyên ngành">
							<Input placeholder="Nhập chuyên ngành" />
						</Form.Item>
						<Form.Item name="registerType" label="Hình thức đăng ký">
							<Select>
								{expertises.map((e) => (
									<Select.Option value={e.id}>{e.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="practiceType"
							label="Hình thức thực hiện"
						>
							<Select>
								{expertises.map((e) => (
									<Select.Option value={e.id}>{e.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="knowForm"
							label="Bạn biết đến Alta Group từ đâu"
							className="mb-0"
						>
							<Select>
								{expertises.map((e) => (
									<Select.Option value={e.id}>{e.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
					</div>
				</div>
				<div className="text-[13px] text-gray font-normal hidden lg:block">
					<span className="text-red-500">*</span> là những trường
					thông tin bắt buộc
				</div>

				<div className="w-[140px] my-8">
					<Button htmlType="submit" className="btn btn-primary p-0">
						<div className="flex items-center justify-center gap-2">
							Gửi
							<SendOutlined />
						</div>
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default JobRegister;
