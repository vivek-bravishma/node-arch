export default async function GetUser(userId, { userRepository }) {
	return userRepository.get(userId);
}
