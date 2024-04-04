import {
	CaretDownFilled,
	CloseCircleOutlined,
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
import React, { useEffect, useState } from "react";
import { CalendarOutline, CloudUploadOutline } from "../../icons";
import { RootState, useAppDispatch } from "../../contexts/store";
import { getExpertises } from "../../contexts/Expertise/expertise.slice";
import { useSelector } from "react-redux";
import { emailRegex } from "../../regex";
import { db, storage } from "../../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import AnnounceModal from "../../components/AnnounceModal/AnnounceModal";

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
	const [modalOpen, setModalOpen] = useState(false);

	const onFinish = async () => {
		try {
			const files: Array<File> = form.getFieldValue("files");
			// Upload các file PDF lên Firebase Storage và lấy download URL
			const uploadTasks = files.map((file) => {
				const fileRef = ref(storage, `/pdf/cv/${file.name}`);
				return uploadBytes(fileRef, file).then((snapshot) => {
					return getDownloadURL(snapshot.ref);
				});
			});

			let uploadUrls: Array<string> = [];

			Promise.all(uploadTasks)
				.then(async (downloadURLs) => {
					console.log(downloadURLs);

					uploadUrls = [...downloadURLs];

					const cvCollection = collection(db, "cvs");
					const {
						dob,
						email,
						expertiseId,
						knowForm,
						major,
						name,
						phone,
						practiceType,
						registerType,
						school,
					} = form.getFieldsValue();
					const submitData = {
						dob: dob.valueOf(),
						email,
						expertiseId,
						knowForm,
						major,
						name,
						phone,
						practiceType,
						registerType,
						school,
						files: uploadUrls,
					};
					// Cập nhật dữ liệu vào Firestore
					await addDoc(cvCollection, submitData);

					setModalOpen(true);
				})
				.catch((error) => {
					console.error("Lỗi khi tải lên các tệp:", error);
					alert("Đã xảy ra lỗi khi tải lên tệp");
				});

			console.log("Upload và cập nhật Firestore thành công!");
		} catch (error) {
			console.error(
				"Lỗi khi upload file hoặc cập nhật Firestore:",
				error,
			);
		}
	};
	useEffect(() => {
		dispatch(getExpertises());
	}, [dispatch]);
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
				key={"modalOpen"}
			/>
			<div className="space-y-4">
				<div className="text-primary font-bold text-2xl lg:text-3xl uppercase">
					Điền thông tin đăng ký
				</div>

				<Form onFinish={onFinish} form={form} layout="vertical">
					<Form.Item
						name={"files"}
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
							<Form.Item
								name={"name"}
								label="Họ và tên"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Input placeholder="Nhập họ và tên" />
							</Form.Item>
							<Form.Item
								name={"dob"}
								label="Ngày sinh"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
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
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Select suffixIcon={<CaretDownFilled />}>
									{expertises.map((e) => (
										<Select.Option value={e.id}>
											{e.name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name="email"
								label="Địa chỉ email"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
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
								name="phone"
								label="Điện thoại"
								className="mb-0"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Input placeholder="Nhập số điện thoại" />
							</Form.Item>
						</div>

						<div className="lg:w-[524px]">
							<Form.Item
								name="school"
								label="Trường đang học"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Input placeholder="Nhập trường đang học" />
							</Form.Item>
							<Form.Item
								name="major"
								label="Chuyên ngành"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Input placeholder="Nhập chuyên ngành" />
							</Form.Item>
							<Form.Item
								name="registerType"
								label="Hình thức đăng ký"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Select suffixIcon={<CaretDownFilled />}>
									<Select.Option value={"Trực tuyến"}>
										Trực tuyến
									</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="practiceType"
								label="Hình thức thực hiện"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Select suffixIcon={<CaretDownFilled />}>
									<Select.Option value={"Phỏng vấn trực tiếp"}>
										Phỏng vấn trực tiếp
									</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="knowForm"
								label="Bạn biết đến Alta Group từ đâu"
								className="mb-0"
								rules={[
									{
										required: true,
										message: "Trường này là bắt buộc",
									},
								]}
							>
								<Select suffixIcon={<CaretDownFilled />}>
									<Select.Option value={"Internet, sách, báo..."}>
										Internet, sách, báo...
									</Select.Option>
									<Select.Option value={"Trường đang học giới thiệu"}>
										Trường đang học giới thiệu
									</Select.Option>
									<Select.Option
										value={"Được bạn bè, người thân giới thiệu"}
									>
										Được bạn bè, người thân giới thiệu
									</Select.Option>
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
		</>
	);
};

export default JobRegister;
