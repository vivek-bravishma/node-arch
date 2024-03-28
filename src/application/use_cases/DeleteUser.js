export default async function DeleteUser(userId, { userRepository }) {
	return userRepository.remove(userId);
}
