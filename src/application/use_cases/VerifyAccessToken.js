export default async function VerifyAccessToken(
	accessToken,
	{ accessTokenManager }
) {
	const decoded = accessTokenManager.decode(accessToken);
	if (!decoded) {
		throw new Error("Invalid access token");
	}
	return { uid: decoded.uid };
}
