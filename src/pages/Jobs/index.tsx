import { useEffect } from "react";
import Filter from "./components/Filter";
import JobList from "./components/JobList";
import { RootState, useAppDispatch } from "../../contexts/store";
import { getFactories } from "../../contexts/Factory/factory.slice";
import { getJobs } from "../../contexts/Job/job.slice";
import { useSelector } from "react-redux";

import SkeletonJobList from "./components/SkeletonJobList";

const Jobs = () => {
	const dispatch = useAppDispatch();
	const jobs = useSelector((state: RootState) => state.job.jobs);
	const isLoading = useSelector(
		(state: RootState) => state.job.isLoading,
	);
	useEffect(() => {
		dispatch(getFactories());
		dispatch(getJobs({}));
	}, [dispatch]);
	return (
		<div className="flex flex-col gap-y-6 lg:gap-y-10">
			<Filter />

			<div>
				<div className="uppercase font-bold text-2xl lg:text-[32px] lg:leading-[48px] text-center">
					Tìm <span className="text-primary">công việc mơ ước </span>
					<br className="block lg:hidden" />
					của bạn <br className="hidden lg:block" /> tại ngôi nhà mới
				</div>
				{jobs.length === 0 && !isLoading && (
					<div className="w-[263px] lg:w-[508px] mx-auto text-center text-sm lg:text-base mt-2 lg:mt-0 font-normal text-gray">
						Khi bạn đang tìm kiếm một công việc, có một số điều bạn có
						thể làm để tận dụng tối đa tìm kiếm của bạn
					</div>
				)}
			</div>

			{jobs && !isLoading && <JobList jobsList={jobs} />}
			{isLoading && <SkeletonJobList />}
			{jobs.length === 0 && !isLoading && (
				<img
					className="w-[343px] lg:w-[639px] mx-auto"
					src="/images/no-jobs.png"
					alt="No job"
				/>
			)}
		</div>
	);
};

export default Jobs;
