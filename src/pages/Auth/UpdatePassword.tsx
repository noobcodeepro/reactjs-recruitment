import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
	return (
		<div className="mt-32">
			<div className="font-bold text-primary text-4xl mb-10">
				Tạo lại mật khẩu
			</div>

			<Form layout="vertical">
				<Form.Item
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Mật khẩu
						</div>
					}
				>
					<Input placeholder="Nhập mật khẩu" />
				</Form.Item>
				<Form.Item
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Mật khẩu
						</div>
					}
				>
					<Input placeholder="Nhập lại mật khẩu" />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" className="btn btn-primary">
						Xác nhận
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

export default UpdatePassword;
export {};
