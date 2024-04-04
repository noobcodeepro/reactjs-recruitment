interface IQuiz {
	id: string;
	title: string;
	duration: number;
	expertiseId: string;
	questions: Array<{
		title: string;
		answers: string[];
	}>;
}

export type { IQuiz };
