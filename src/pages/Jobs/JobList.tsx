import React, { useEffect } from "react";
import { IJob } from "../../type/job.type";
import JobItem from "./JobItem";

const JobList = ({ jobsList }: { jobsList: IJob[] }) => {
	useEffect(() => {
		console.log("Job list", jobsList);
	}, []);
	return (
		<div>
			<div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-12">
				{jobsList.map((j) => (
					<JobItem job={j} />
				))}
			</div>
		</div>
	);
};

export default JobList;
