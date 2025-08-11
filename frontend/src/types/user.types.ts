interface UserFormData {
	username: string;
	password: string;
	avatar: FileList;
}

interface Responses {
	success: boolean;
	message: string;
}

interface User {
	id: string,
	username: string,
	avatarPath: string,
}

interface UserCreateResponse extends Responses {
	createdUser?: User & { createdAt: Date };
}

interface GetAllUsersResponse extends Responses {
	users: User[];
}


export type {
	UserFormData,
	UserCreateResponse,
	GetAllUsersResponse,
}
