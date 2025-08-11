interface UserData {
	username: string;
	password: string;
	avatarPath: string | null;
}

interface Response {
	success: boolean,
	message: string,
}

interface UserCreateResponse extends Response {
	createdUser?: {
		id: string;
		username: string;
		avatarPath: string | null;
		createdAt: Date;
	}
}

interface LoginResponse extends Response {
	user?: {
		id: string,
		username: string,
		password?: string,
		avatarPath: string | null,
	}
}

export type {
	UserData,
	UserCreateResponse,
	LoginResponse,
}
