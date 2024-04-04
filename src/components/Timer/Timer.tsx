import React, { memo, useEffect, useState } from "react";

interface TimerProps {
	duration: number;
	handleEnd: () => {};
}

const formatTime = (timeInSeconds: number) => {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = timeInSeconds % 60;
	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const Timer = ({ handleEnd, duration }: TimerProps) => {
	const [timer, setTimer] = useState<number>(duration);
	const [isTimerRunning, setIsTimerRunning] = useState(true);

	useEffect(() => {
		if (!isTimerRunning) return; // Nếu timer không chạy, không cần làm gì

		const intervalId = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1); // Giảm timer đi 1 giây sau mỗi lần gọi

			if (timer <= 0) {
				// Nếu timer đếm ngược về 0
				setIsTimerRunning(false); // Dừng timer
				clearInterval(intervalId); // Dừng interval
				// Thực hiện cuộc gọi API ở đây
				handleEnd();
			}
		}, 1000); // Định kỳ gọi sau mỗi 1 giây

		return () => clearInterval(intervalId); // Clear interval khi component unmount
	}, [timer, isTimerRunning, handleEnd]);

	return <>{formatTime(timer)}</>;
};

export default memo(Timer);
