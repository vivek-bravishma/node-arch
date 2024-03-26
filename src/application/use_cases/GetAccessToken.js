export default GetAccessToken = async (
	email,
	password,
	{ userRepository, accessTokenManager }
) => {
	const user = userRepository.getByEmail(email);
	if (!user || user.password !== password) {
		throw new Error("Bad credentials");
	}
	return accessTokenManager.generate({ uid: user.id });
};
