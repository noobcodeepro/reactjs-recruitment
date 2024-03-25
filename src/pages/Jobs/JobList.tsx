import { IJob } from "../../type/job.type";
import JobItem from "./JobItem";

const JobList = ({ jobsList }: { jobsList: IJob[] }) => {
	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12">
				{jobsList.map((j) => (
					<JobItem key={j.id} job={j} />
				))}
			</div>
		</div>
	);
};

export default JobList;
