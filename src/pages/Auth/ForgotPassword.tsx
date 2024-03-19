import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	confirmPasswordReset,
	sendPasswordResetEmail,
} from "firebase/auth";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [form] = useForm();

	const onFinish = async () => {
		const { email } = form.getFieldsValue();
		await sendPasswordResetEmail(auth, email, {
			url: "http://localhost:3000/login",
		}).then((res) => {
			alert("Email đã được gửi, kiểm tra email để thay password");
			navigate("/login");
		});
	};

	const emailRegex = new RegExp(
		"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$",
	);
	return (
		<div className="mt-32">
			<div className="font-bold text-primary text-4xl mb-2">
				Quên mật khẩu
			</div>
			<div className="text-base font-normal text-[#494949] mb-10">
				Vui lòng nhập địa chỉ email đã đăng kí để yêu cầu <br /> khôi
				phục lại mật khẩu
			</div>

			<Form form={form} onFinish={onFinish} layout="vertical">
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
					<Input placeholder="Nhập email của bạn" />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" className="btn btn-primary">
						Đăng nhập
					</Button>
				</Form.Item>

				<div className="text-end">
					<Link
						to="/login"
						className="text-primary underline text-base font-normal hover:text-primary hover:opacity-70"
					>
						Quay lại đăng nhập
					</Link>
				</div>
			</Form>
		</div>
	);
};

export default ForgotPassword;
export {};
