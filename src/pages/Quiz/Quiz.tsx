import {
	Button,
	Form,
	Modal,
	Radio,
	RadioChangeEvent,
	Select,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../contexts/store";
import { getExpertises } from "../../contexts/Expertise/expertise.slice";
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	CaretDownFilled,
	PlusOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { db } from "../../lib/firebase";
import {
	addDoc,
	collection,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { IQuiz } from "../../type/quiz.type";
import Timer from "../../components/Timer/Timer";
import {
	ArrowLeftOutline,
	ArrowRightOutline,
	ClockOutline,
} from "../../icons";
import QuizForm from "./component/QuizForm";

const Quiz = () => {
	const dispatch = useAppDispatch();
	const expertises = useSelector(
		(state: RootState) => state.expertise.expertises,
	);
	const user = useSelector((state: RootState) => state.auth.user);
	const [currentTest, setCurrentTest] = useState<IQuiz | null>(null);

	const fieldOptions: DefaultOptionType[] = expertises.map((e) => ({
		label: <div className="relative">{e.name}</div>,
		value: e.id,
	}));

	const [form] = useForm();

	const onFinish = async () => {
		const { expertiseId } = form.getFieldsValue();

		const quizCollection = collection(db, "tests");
		let quizQuery = query(quizCollection);

		if (expertiseId) {
			quizQuery = query(
				quizQuery,
				where("expertiseId", "==", expertiseId),
			);
		}
		let querySnapshot = (await getDocs(quizQuery)).docs;

		const data = querySnapshot.map((q) => ({
			...q.data(),
			id: q.id,
		}));

		if (data.length !== 0) {
			const randomIndex = Math.floor(Math.random() * data.length);
			setCurrentTest({ ...data[randomIndex] } as IQuiz);
		}
	};

	useEffect(() => {
		dispatch(getExpertises());
	}, [dispatch]);
	return (
		<>
			<></>
			{!currentTest && (
				<div className="flex flex-col gap-y-6 lg:gap-y-10">
					<div className="font-bold text-2xl lg:text-[34px] lg:leading-[48px] text-center">
						Xin chào{" "}
						<span className="uppercase text-primary">
							{user?.displayName ? user.displayName : user?.email}
						</span>
					</div>

					<Form form={form} onFinish={onFinish}>
						<div className="w-[852px] mx-auto flex items-center bg-white p-1">
							<div className="flex-1">
								<Form.Item className="mb-0" name={"expertiseId"}>
									<Select
										suffixIcon={<CaretDownFilled />}
										className="w-full"
										placeholder={
											<div className="text-black text-base">
												Chọn môn thi
											</div>
										}
										options={fieldOptions}
									/>
								</Form.Item>
							</div>

							<div>
								<Button
									htmlType="submit"
									className="btn btn-primary text-base px-5 py-2"
									icon={<PlusOutlined />}
								>
									Tạo đề thi
								</Button>
							</div>
						</div>
					</Form>
				</div>
			)}

			{currentTest && (
				<QuizForm
					currentQuiz={currentTest}
					onSubmit={() => setCurrentTest(null)}
				/>
			)}
		</>
	);
};

export default Quiz;
