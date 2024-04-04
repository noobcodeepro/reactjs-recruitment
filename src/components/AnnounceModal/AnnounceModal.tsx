import { Button, Modal } from "antd";
import React, { ReactNode } from "react";

interface IAnnounceProps {
	description: ReactNode | string;
	open: boolean;
	handleClose: () => void;
}

const AnnounceModal = ({
	description,
	open,
	handleClose,
}: IAnnounceProps) => {
	return (
		<>
			<Modal
				centered
				closeIcon={<></>}
				width={466}
				className="relative"
				title={
					<div className="text-[32px] font-bold text-primary text-center mt-8">
						Thông báo
					</div>
				}
				open={open}
				footer={null}
			>
				<div className="absolute rotate-[0.8deg] top-[5px] left-0">
					<img src="/images/flags.png" alt="flags" />
				</div>
				<div className="absolute bottom-0 right-0">
					<img src="/images/loudSpeaker.png" alt="loudSpeaker" />
				</div>
				<div className="text-center text-base font-normal max-w-[384px] min-h-[72px] mx-auto">
					{description}
				</div>
				<div className="w-fit mx-auto mt-4">
					<Button
						className="btn btn-secondary w-[120px] h-[44px] py-0 font-semibold text-base"
						onClick={handleClose}
					>
						Đóng
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default AnnounceModal;
