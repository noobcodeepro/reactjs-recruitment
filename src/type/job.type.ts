import { IFactory } from "./factory.type";

interface IJob {
	id: string;
	requirement: string;
	name: string;
	expertise: string;
	factoryId: string;
	factory?: IFactory;
}

export type { IJob };
