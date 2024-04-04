import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import FormLabel from "../../components/FormLabel/FormLabel";
import { CaretDownFilled, SendOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import AnnounceModal from "../../components/AnnounceModal/AnnounceModal";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";

const LearningProcess = () => {
	const [form] = useForm();
	const currentUser = useSelector(
		(state: RootState) => state.auth.user,
	);
	const onFinish = async () => {
		const { reports, link, options } = form.getFieldsValue();
		const learningProcessCollection = collection(
			db,
			"learningProcesses",
		);
		const data = {
			userUID: currentUser?.uid,
			content: {
				options,
				link,
				reports,
			},
		};
		await addDoc(learningProcessCollection, data);

		form.resetFields();
		setModalOpen(true);
	};

	const [modalOpen, setModalOpen] = useState(false);
	return (
		<>
			<AnnounceModal
				description={
					<div>
						Bạn đã nộp đơn ứng tuyển thành công. <br /> Vui lòng đợi
						phản hồi từ công ty qua mail của bạn!
					</div>
				}
				handleClose={() => setModalOpen(false)}
				open={modalOpen}
				key={"modalAnnounce"}
			/>
			<div className="flex flex-col gap-y-6 lg:gap-y-10">
				<div className="font-bold text-2xl lg:text-[34px] lg:leading-[48px]">
					Xin chào{" "}
					<span className="uppercase text-primary">
						{currentUser?.email}
					</span>
				</div>
			</div>

			<Form onFinish={onFinish} form={form} layout="vertical">
				<div className="mt-4 w-[524px]">
					<Form.Item
						name={"options"}
						label={
							<FormLabel label="Chọn lớp / Chọn nhóm thực tập" />
						}
					>
						<Select suffixIcon={<CaretDownFilled />}>
							<Select.Option value="Option 1">Option 1</Select.Option>
							<Select.Option value="Option 2">Option 2</Select.Option>
							<Select.Option value="Option 3">Option 3</Select.Option>
							<Select.Option value="Option 4">Option 4</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item
						name={"link"}
						label={<FormLabel label="Link file" />}
					>
						<Input placeholder="Nhập trường đang học" />
					</Form.Item>
					<Form.Item
						name={"reports"}
						label={<FormLabel label="Nội dung báo cáo" />}
					>
						<TextArea rows={5} placeholder="Nhập trường đang học" />
					</Form.Item>
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
		</>
	);
};

export default LearningProcess;
