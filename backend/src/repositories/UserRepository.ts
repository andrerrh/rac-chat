import User from '../models/User.ts';

const UserRepository = async () => {
	User.create({username: "Andrel", password: "12345"})
}

export default UserRepository;
