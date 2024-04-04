import { Button, Checkbox, Form, Input } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Select from "../../components/Select/Select";
import { useAppDispatch } from "../../contexts/store";
import { authLogin } from "../../contexts/Auth/auth.slice";
import { useForm } from "antd/es/form/Form";
import emailRegex from "../../regex/emailRegex";

const { Password } = Input;

const Login = () => {
	const [form] = useForm();
	const [disabledButton, setDisabledButton] = useState(true);
	const [errMessage, setErrMessage] = useState("");
	const onChange = () => {
		setDisabledButton(false);
	};
	useEffect(() => {
		console.log(errMessage);
	}, [errMessage]);
	const dispatch = useAppDispatch();

	const onFinish = async () => {
		const { email, password, role } = form.getFieldsValue();

		try {
			console.log("Sending data:", email, password, role);

			dispatch(authLogin({ email, password, role }))
				.unwrap()
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);

					setErrMessage(err.message);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const roleOptions: DefaultOptionType[] = [
		{
			value: "enterprise",
			label: <div className="relative">Doanh nghiệp</div>,
			className: "",
		},
		{
			value: "student",
			label: <div className="relative">Học sinh / Sinh viên</div>,
		},
		{
			value: "attendant",
			label: <div className="relative">Attendant</div>,
		},
	];
	return (
		<div>
			<div className="font-bold text-primary text-4xl mb-8">
				Đăng nhập
			</div>

			<Form onFinish={onFinish} form={form} layout="vertical">
				<Form.Item
					name="role"
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Vai trò
						</div>
					}
					rules={[
						{
							required: true,
							message: "Yêu cầu nhập trường này",
						},
					]}
				>
					<Select options={roleOptions}></Select>
				</Form.Item>
				<Form.Item
					name={"email"}
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Email
						</div>
					}
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
					<Input placeholder="Tên đăng nhập" />
				</Form.Item>
				<Form.Item
					name={"password"}
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Mật khẩu
						</div>
					}
				>
					<Password placeholder="Nhập mật khẩu" />
				</Form.Item>
				<div className="flex justify-between items-center mb-4">
					<div className="">
						<Form.Item name={"rememberPassword"} className="mb-0">
							<Checkbox>
								<span>Ghi nhớ mật khẩu</span>
							</Checkbox>
						</Form.Item>
					</div>

					<div>
						<Link
							to={"/forgot-password"}
							className="text-primary underline text-base font-normal hover:text-primary hover:opacity-70"
						>
							Quên mật khẩu?
						</Link>
					</div>
				</div>
				<div className="mb-4">
					<ReCAPTCHA
						sitekey="6LewP5gpAAAAAPNOIKREvrkJVtOvzjH9ihPdCs5Q"
						onChange={onChange}
					/>
				</div>
				<div className="text-red-400">
					{errMessage ? errMessage : ""}
				</div>
				<Form.Item>
					<Button
						disabled={disabledButton}
						htmlType="submit"
						className={`btn ${
							disabledButton ? "btn-disabled" : "btn-primary"
						}`}
					>
						Đăng nhập
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
export {};
