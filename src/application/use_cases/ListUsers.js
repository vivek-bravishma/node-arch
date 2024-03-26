export default ListUsers = ({ userRepository }) => {
	return userRepository.find();
};
