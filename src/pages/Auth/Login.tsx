import { CaretDownFilled } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

const { Password } = Input;
const Login = () => {
	const [disabledButton, setDisabledButton] = useState(true);
	const onChange = () => {
		setDisabledButton(false);
	};
	const roleOptions: DefaultOptionType[] = [
		{
			title: "Option 1",
			value: "Option 1",
		},
		{
			title: "Option 2",
			value: "Option 2",
		},
		{
			title: "Option 3",
			value: "Option 3",
		},
	];
	return (
		<div>
			<div className="font-bold text-primary text-4xl mb-8">
				Đăng nhập
			</div>

			<Form layout="vertical">
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
					<Select
						suffixIcon={
							<CaretDownFilled style={{ fontSize: "16px" }} />
						}
						options={roleOptions}
					></Select>
				</Form.Item>
				<Form.Item
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Email
						</div>
					}
				>
					<Input placeholder="Tên đăng nhập" />
				</Form.Item>
				<Form.Item
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
						<Form.Item className="mb-0">
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
