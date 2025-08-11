interface UserData {
	username: string;
	password: string;
	avatarPath: string;
}

interface UserCreateResponse {
	success: boolean;
	message: string;
	createdUser?: {
		id: string;
		username: string;
		avatarPath: string;
		createdAt: Date;
	}
}

export type {
	UserData,
	UserCreateResponse
}
