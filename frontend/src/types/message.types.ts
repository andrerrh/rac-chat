interface ReceiveMessageProps {
	message: string;
	userId: string;
	username: string
	date: string;
}

interface HistoryMessagesProps {
	createdAt: string;
	message: string;
	receiver: {
		id: number;
		username: string;
	}
	sender: {
		id: number;
		username: string
	}
}

export type {
	ReceiveMessageProps,
	HistoryMessagesProps,
}
