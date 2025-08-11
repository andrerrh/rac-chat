interface UserData {
	username: string;
	password: string;
	avatarPath: string | null;
}

interface UserCreateResponse {
	success: boolean;
	message: string;
	createdUser?: {
		id: string;
		username: string;
		avatarPath: string | null;
		createdAt: Date;
	}
}

export type {
	UserData,
	UserCreateResponse
}
