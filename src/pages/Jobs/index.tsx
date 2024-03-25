import React, { useEffect } from "react";
import Filter from "./Filter";
import JobList from "./JobList";
import { RootState, useAppDispatch } from "../../contexts/store";
import {
	getFactories,
	getFactory,
} from "../../contexts/Factory/factory.slice";
import { getJobs } from "../../contexts/Job/job.slice";
import { useSelector } from "react-redux";

import { IFactory } from "../../type/factory.type";
import SkeletonJobList from "./SkeletonJobList";

const Jobs = () => {
	const dispatch = useAppDispatch();
	const jobs = useSelector((state: RootState) => state.job.jobs);
	const isLoading = useSelector(
		(state: RootState) => state.job.isLoading,
	);
	useEffect(() => {
		dispatch(getFactories());
		dispatch(getJobs({}));
	}, []);
	return (
		<div className="flex flex-col gap-y-10">
			<Filter />

			<div>
				<div className="uppercase font-bold text-[32px] text-center">
					Tìm <span className="text-primary">công việc mơ ước</span>{" "}
					của bạn <br /> tại ngôi nhà mới
				</div>
				{jobs.length === 0 && !isLoading && (
					<div className="lg:w-[508px] mx-auto text-center text-base font-normal text-gray">
						Khi bạn đang tìm kiếm một công việc, có một số điều bạn có
						thể làm để tận dụng tối đa tìm kiếm của bạn
					</div>
				)}
			</div>

			{jobs && !isLoading && <JobList jobsList={jobs} />}
			{isLoading && <SkeletonJobList />}
			{jobs.length === 0 && !isLoading && (
				<img
					className="w-[639px] mx-auto"
					src="/images/no-jobs.png"
					alt="No job"
				/>
			)}
		</div>
	);
};

export default Jobs;
