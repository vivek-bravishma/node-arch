export default GetUser = (userId, { userRepository }) => {
	return userRepository.get(userId);
};
