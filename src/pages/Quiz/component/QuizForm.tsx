import React, { useCallback, useState } from "react";
import { IQuiz } from "../../../type/quiz.type";
import {
	ArrowLeftOutline,
	ArrowRightOutline,
	ClockOutline,
} from "../../../icons";
import Timer from "../../../components/Timer/Timer";
import { Button, Modal, Radio, RadioChangeEvent } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../contexts/store";

interface IQuizFormProps {
	onSubmit: () => void;
	currentQuiz: IQuiz;
}
const QuizForm = ({ onSubmit, currentQuiz }: IQuizFormProps) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [attendantAnswer, setAttendantAnswer] = useState<string[]>(
		new Array(currentQuiz?.questions.length).fill(""),
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const answerCollection = collection(db, "answers");
	const currentUserUID = useSelector(
		(state: RootState) => state.auth.user?.uid,
	);
	const quizOptions = ["A", "B", "C", "D"];

	// Timer
	// This will be called when time's up
	const fetchApi = useCallback(async () => {
		try {
			// Thực hiện cuộc gọi API ở đây
			setIsModalOpen(false);
			if (currentUserUID) {
				const data = {
					userUid: currentUserUID,
					testId: currentQuiz?.id,
					answers: attendantAnswer,
				};

				await addDoc(answerCollection, data);

				setAttendantAnswer(
					new Array(currentQuiz?.questions.length).fill(""),
				);
			}
			onSubmit();
		} catch (error) {
			console.error("Error fetching API:", error);
		}
	}, [
		onSubmit,
		attendantAnswer,
		currentQuiz.id,
		answerCollection,
		currentQuiz.questions.length,
		currentUserUID,
	]);

	const onSubmitQuiz = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onAnswer = (e: RadioChangeEvent) => {
		const data = [...attendantAnswer];
		data[currentQuestion] = e.target.value;

		setAttendantAnswer(data);
	};

	const handleOk = async () => {
		setIsModalOpen(false);
		if (currentUserUID) {
			const data = {
				userUid: currentUserUID,
				testId: currentQuiz?.id,
				answers: attendantAnswer,
			};

			await addDoc(answerCollection, data);

			setAttendantAnswer(
				new Array(currentQuiz?.questions.length).fill(""),
			);
		}
		onSubmit();
	};

	return (
		<>
			<Modal
				title={
					<div className="mt-4 text-primary font-bold text-center text-[26px]">
						Nộp bài thi
					</div>
				}
				width={460}
				centered
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				closeIcon={<></>}
				footer={
					<div className="ant-modal-footer text-center flex items-center mx-[110px] mb-6">
						<Button
							onClick={handleCancel}
							className="btn btn-secondary font-normal h-[44px] py-0 px-4 text-base"
						>
							Đóng
						</Button>
						<Button
							onClick={handleOk}
							className="btn btn-primary font-normal h-[44px] py-0 px-4 text-base"
						>
							Xác nhận
						</Button>
					</div>
				}
			>
				<div className="text-center font-normal text-base text-[#666] mb-4">
					Bạn có chắc muốn nộp bài thi hay không?
				</div>
			</Modal>
			{currentQuiz && (
				<div className="mt-8">
					<div className="text-[20px] font-semibold text-[#494949]">
						Đề thi môn
					</div>
					<div className="text-[32px] font-bold text-[#494949]">
						{currentQuiz.title}
					</div>

					<div className="flex items-center p-2 bg-white text-[20px] rounded-xl mt-4">
						<div className="p-2 flex-1">
							<span className="font-normal">Tổng câu hỏi:</span>{" "}
							<span className="font-bold text-primary">
								{currentQuiz.questions.length}
							</span>
						</div>

						<div className="p-2 flex-1">
							<span className="font-normal">Hoàn thành:</span>{" "}
							<span className="font-bold text-primary">
								{attendantAnswer.filter((a) => a !== "").length}/
								{currentQuiz.questions.length}
							</span>
						</div>

						<div className="p-2 flex-1 flex gap-2 items-center">
							<span className="inline-block">
								<ClockOutline />
							</span>
							<span className="font-bold text-primary">
								<Timer
									duration={currentQuiz.duration}
									handleEnd={fetchApi}
								/>
							</span>
						</div>
						<div>
							<Button
								className="btn btn-primary"
								onClick={onSubmitQuiz}
							>
								Nộp bài
							</Button>
						</div>
					</div>

					<div className="space-y-3 mt-8">
						<div className="font-semibold text-[20px] leading-5">
							Câu {currentQuestion + 1}:
						</div>
						<div className="font-normal text-[18px]">
							{currentQuiz.questions[currentQuestion].title}
						</div>

						<div>
							<Radio.Group
								onChange={onAnswer}
								value={attendantAnswer[currentQuestion]}
								className="space-y-4 w-[633px]"
							>
								{currentQuiz.questions[currentQuestion].answers.map(
									(a, index) => (
										<Radio
											className="bg-white w-full py-[13px] px-4 font-normal text-base rounded-lg"
											value={a}
										>
											{quizOptions[index] ? quizOptions[index] : ""}.{" "}
											{a}
										</Radio>
									),
								)}
							</Radio.Group>
						</div>
					</div>

					<div className="w-fit ml-auto mt-20">
						<div className="flex items-center gap-4">
							<span
								className="cursor-pointer"
								onClick={() =>
									setCurrentQuestion((prev) =>
										prev === 0 ? prev : prev - 1,
									)
								}
							>
								<ArrowLeftOutline />
							</span>

							<span
								className="cursor-pointer"
								onClick={() =>
									setCurrentQuestion((prev) =>
										prev === currentQuiz.questions.length - 1
											? prev
											: prev + 1,
									)
								}
							>
								<ArrowRightOutline />
							</span>
						</div>
					</div>
				</div>
			)}
			;
		</>
	);
};

export default QuizForm;
