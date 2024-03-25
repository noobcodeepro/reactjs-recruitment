interface IFactory {
	address: string;
	email: string;
	phone: string;
	name: string;
	id: string;
	manager: IManager;
	photoUrl?: string;
}

interface IManager {
	managerName: string;
	managerPhone?: string;
}

export type { IFactory, IManager };
