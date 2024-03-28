import User from "../../domain/User";

const UpdateUser = async (userId, updatedUserData, { userRepository }) => {
	// const existingUser = await userRepository.get(userId);
	// if (!existingUser) {
	// 	throw new Error(`User with id ${userId} not found`);
	// }

	console.log("=======> ", { userId, updatedUserData });

	// existingUser.firstName = updatedUserData.firstName || existingUser.firstName;
	// existingUser.lastName = updatedUserData.lastName || existingUser.lastName;
	// existingUser.email = updatedUserData.email || existingUser.email;
	// existingUser.password = updatedUserData.password || existingUser.password;

	// // Persist the updated user data
	// await userRepository.persist(existingUser);

	// return existingUser;
	return { userId, updatedUserData };
};

export default UpdateUser;
