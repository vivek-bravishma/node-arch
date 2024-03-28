export default async function ListUsers({ userRepository }) {
	return userRepository.find();
}
