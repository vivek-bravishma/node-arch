import User from "../../domain/User.js";

export default CreateUser = (
	firstName,
	lastName,
	email,
	password,
	{ userRepository }
) => {
	const user = new User(null, firstName, lastName, email, password);
	return userRepository.persist(user);
};
