import React from "react";
import Filter from "./Filter";
import JobList from "./JobList";

const Jobs = () => {
	return (
		<div className="flex flex-col gap-y-10">
			<Filter />

			<div className="uppercase font-bold text-[32px] text-center">
				Tìm <span className="text-primary">công việc mơ ước</span> của
				bạn <br /> tại ngôi nhà mới
			</div>

			<JobList />
		</div>
	);
};

export default Jobs;
