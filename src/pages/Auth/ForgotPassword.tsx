import { Button, Form, Input } from "antd";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
	const navigate = useNavigate();
	return (
		<div className="mt-32">
			<div className="font-bold text-primary text-4xl mb-2">
				Quên mật khẩu
			</div>
			<div className="text-base font-normal text-[#494949] mb-10">
				Vui lòng nhập địa chỉ email đã đăng kí để yêu cầu <br /> khôi
				phục lại mật khẩu
			</div>

			<Form layout="vertical">
				<Form.Item
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Email
						</div>
					}
				>
					<Input placeholder="Nhập email của bạn" />
				</Form.Item>
				<Form.Item>
					<Button
						onClick={() => {
							navigate("/update-password");
						}}
						className="btn btn-primary"
					>
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
