import React from "react";
import { IJob } from "../../type/job.type";
import { Divider, Image } from "antd";
import { Download, MailOutline, PhoneOutline } from "../../icons";
import formatPhoneNumber from "../../utils/formatPhoneNumber";

const JobItem = ({ job }: { job: IJob }) => {
	return (
		<div className="bg-white rounded-xl ">
			<div className="p-3">
				<div className="flex justify-between pb-2">
					<div className="flex gap-2 items-start">
						<div className="">
							<img
								src={job.factory?.photoUrl}
								alt={job.factory?.name}
							/>
						</div>
						<div className="">
							<h6 className="font-medium leading-[1.1] text-base text-[#494949]">
								{job.name}
							</h6>
							<p className="text-[#929292] leading-[1.1]">
								{job.factory?.name}
							</p>
						</div>
					</div>

					<div className="btn bg-primary h-[36px] aspect-square text-center p-0 flex items-center justify-center w-fit">
						<Download stroke="white" />
					</div>
				</div>

				<div className="max-w-[244px] text-wrap line-clamp-2 font-normal text-sm text-[#494949] leading-4">
					Yêu cầu: {job.requirement}
				</div>
			</div>

			<Divider
				dashed
				style={{ borderColor: "#B6B6B6" }}
				className="my-0"
			/>

			<div className="divide-x-2 divide-slate-300 flex items-center max-w-full py-2 font-normal text-sm text-[#6D6D6D]">
				<div className="flex justify-center gap-2 py-1 px-6 text-nowrap overflow-hidden tracking-tight">
					<span>
						<MailOutline width={24} />
					</span>{" "}
					<span>{job.factory?.email}</span>
				</div>
				<div className="flex justify-center gap-2 py-1 px-6 text-nowrap overflow-hidden tracking-tight">
					<span>
						<PhoneOutline />
					</span>{" "}
					<span>
						{job.factory?.phone
							? formatPhoneNumber(job.factory.phone)
							: ""}
					</span>
				</div>
			</div>
		</div>
	);
};

export default JobItem;
