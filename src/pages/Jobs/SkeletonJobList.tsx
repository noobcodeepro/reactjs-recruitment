import { Skeleton } from "antd";
import React from "react";

const SkeletonJobList = () => {
	return (
		<div className="grid sm:grid-cols-1 lg:grid-cols-3">
			<div>
				<Skeleton avatar paragraph={{ rows: 4 }} />
			</div>
			<div>
				<Skeleton avatar paragraph={{ rows: 4 }} />
			</div>
			<div>
				<Skeleton avatar paragraph={{ rows: 4 }} />
			</div>
		</div>
	);
};

export default SkeletonJobList;
