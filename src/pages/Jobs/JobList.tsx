import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { IJob } from "../../type/job.type";
import JobItem from "./JobItem";

const JobList = ({ jobsList }: { jobsList: IJob[] }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 6;
	const totalPages = Math.ceil(jobsList.length / pageSize);

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, jobsList.length);

	const currentPageData = jobsList.slice(startIndex, endIndex);

	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12">
				{currentPageData.map((j) => (
					<JobItem key={j.id} job={j} />
				))}
			</div>

			<Pagination
				pageSize={pageSize}
				setCurrent={setCurrentPage}
				total={totalPages}
			/>
		</div>
	);
};

export default JobList;
