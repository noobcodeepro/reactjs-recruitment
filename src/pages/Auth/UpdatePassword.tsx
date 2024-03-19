import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { confirmPasswordReset } from "firebase/auth";
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../lib/firebase";

const { Password } = Input;

const UpdatePassword = () => {
	const [form] = useForm();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	let oobCode: string | null = searchParams.get("oobCode");
	let mode: string | null = searchParams.get("mode");
	let apiKey: string | null = searchParams.get("apiKey");
	let continueUrl: string | null = searchParams.get("continueUrl");

	const resetPassword = async ({
		oobCode,
		newPassword,
	}: {
		oobCode: string;
		newPassword: string;
	}) => {
		confirmPasswordReset(auth, oobCode, newPassword)
			.then((res) => {
				console.log(res);
				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const onFinish = async () => {
		const { password } = form.getFieldsValue();
		try {
			if (oobCode) {
				resetPassword({ oobCode, newPassword: password });
			} else {
				alert("Something is wrong; try again later!");
				console.log("missing oobCode");
			}
		} catch (error: any) {
			if (error.code === "auth/invalid-action-code") {
				alert("Something is wrong; try again later.");
			}
			console.log(error.message);
		}
	};

	return (
		<div className="mt-32">
			<div className="font-bold text-primary text-4xl mb-10">
				Tạo lại mật khẩu
			</div>

			<Form form={form} onFinish={onFinish} layout="vertical">
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
				<Form.Item
					name={"passwordConfirm"}
					dependencies={["password"]}
					rules={[
						{
							required: true,
							message: "Trường này là bắt buộc",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										"The new password that you entered do not match!",
									),
								);
							},
						}),
					]}
					label={
						<div className="text-[#4D4D4D] font-semibold text-base">
							Mật khẩu
						</div>
					}
				>
					<Password placeholder="Nhập lại mật khẩu" />
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
