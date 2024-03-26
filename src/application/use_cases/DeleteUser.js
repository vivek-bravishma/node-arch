export default DeleteUser = (userId, { userRepository }) => {
	return userRepository.remove(userId);
};
