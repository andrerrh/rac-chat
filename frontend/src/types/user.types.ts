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

interface getUserResponse extends Responses {
	user: User;
}


interface GetAllUsersResponse extends Responses {
	users: User[];
}

interface LoginResponse extends Responses {
	user: User;
}


export type {
	getUserResponse,
	UserFormData,
	UserCreateResponse,
	GetAllUsersResponse,
	LoginResponse,
}
