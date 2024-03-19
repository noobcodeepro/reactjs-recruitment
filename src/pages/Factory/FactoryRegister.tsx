import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { emailRegex, phoneRegex } from "../../regex";
import { SendOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../contexts/store";
import { IFactory } from "../../type/factory.type";
import { addFactory } from "../../contexts/Factory/factory.slice";

const FormLabel = ({
	label,
	className = "",
}: {
	label: string;
	className?: string;
}) => {
	return (
		<div className={`font-semibold text-base ${className}`}>
			{label}
		</div>
	);
};

const FactoryRegister = () => {
	const [form] = useForm();
	const dispatch = useAppDispatch();

	const onFinish = () => {
		const { email, address, manager, name, phone, phoneManager } =
			form.getFieldsValue();
		const registeringFactory: Omit<IFactory, "id"> = {
			email,
			address,
			name,
			phone,
			manager: {
				managerName: manager,
				managerPhone: phoneManager,
			},
		};

		dispatch(addFactory(registeringFactory))
			.then((res) => {
				// form.resetFields();
				alert("Đăng ký thành công!");
			})
			.catch((err) => {
				alert("Đã xảy ra lỗi. Vui lòng thử lại");
				console.log(err);
			});
	};
	return (
		<div>
			<div className="uppercase text-primary font-bold text-[32px] mb-4">
				Điền thông tin đăng ký
			</div>

			<Form onFinish={onFinish} form={form} layout="vertical">
				<div className="grid grid-cols-2 gap-x-16">
					<div>
						<Form.Item
							name={"email"}
							label={<FormLabel label="Email liên hệ" />}
							rules={[
								{
									required: true,
									message: "Trường này không được trống",
								},
								{
									pattern: emailRegex,
									message: "Vui lòng điền một email hợp lệ",
								},
							]}
						>
							<Input placeholder="Nhập email" />
						</Form.Item>
						<Form.Item
							name={"name"}
							label={<FormLabel label="Tên doanh nghiệp" />}
							rules={[
								{
									required: true,
									message: "Trường này không được trống",
								},
							]}
						>
							<Input placeholder="Nhập tên doanh nghiệp" />
						</Form.Item>
						<Form.Item
							name={"phone"}
							label={<FormLabel label="Điện thoại công ty" />}
							rules={[
								{
									required: true,
									message: "Trường này không được trống",
								},
								{
									pattern: phoneRegex,
									message:
										"Số điện thoại không hợp lệ vui lòng thử lại",
								},
							]}
						>
							<Input placeholder="Nhập số điện thoại" />
						</Form.Item>
					</div>
					<div>
						<Form.Item
							name={"address"}
							label={<FormLabel label="Địa chỉ công ty" />}
							rules={[
								{
									required: true,
									message: "Trường này không được trống",
								},
							]}
						>
							<Input placeholder="Nhập địa chỉ" />
						</Form.Item>
						<Form.Item
							name={"manager"}
							label={<FormLabel label="Người quản lí" />}
							rules={[
								{
									required: true,
									message: "Trường này không được trống",
								},
							]}
						>
							<Input placeholder="Nhập tên người quản lí" />
						</Form.Item>
						<Form.Item
							name={"phoneManager"}
							label={<FormLabel label="Điện thoại người quản lí" />}
							rules={[
								{
									pattern: phoneRegex,
									message:
										"Số điện thoại không hợp lệ vui lòng thử lại",
								},
							]}
						>
							<Input placeholder="Nhập số điện thoại" />
						</Form.Item>
					</div>
				</div>

				<div className="mb-6 font-normal text-[13px] text-gray">
					<span className="text-red-500">*</span> là những trường
					thông tin bắt buộc
				</div>

				<div className="w-[140px]">
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

export default FactoryRegister;
