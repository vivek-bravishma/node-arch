import Boom from "@hapi/boom";
import GetAccessToken from "../../application/use_cases/GetAccessToken";
import VerifyAccessToken from "../../application/use_cases/VerifyAccessToken";

export default AuthorizationController = {
	async getAccessToken(request) {
		const serviceLocator = request.server.app.serviceLocator;

		const grantType = request.payload["grant_type"];
		const email = request.payload["username"];
		const password = request.payload["password"];

		if (!grantType || grantType !== "password") {
			return Boom.badRequest("Invalid authentication strategy");
		}

		try {
			const accessToken = await GetAccessToken(
				email,
				password,
				serviceLocator
			);
			return accessToken;
		} catch (error) {
			return Boom.unauthorized("Bad credentials");
		}
	},

	VerifyAccessToken(request, h) {
		const serviceLocator = request.server.app.serviceLocator;
		const authorizationHeader = request.headers.authorization;
		if (
			!authorizationHeader ||
			!authorizationHeader.startsWith("Bearer ")
		) {
			throw Boom.badRequest(
				"Missing or wrong Authorization request header ",
				"oauth"
			);
		}

		const accessToken = authorizationHeader
			.replace(/Bearer/gi, "")
			.replace(/ /g, "");

		try {
			const { uid } = VerifyAccessToken(accessToken, serviceLocator);

			return h.authenticated({
				credentials: { uid },
				artifacts: { accessToken: accessToken },
			});
		} catch (error) {
			return Boom.unauthorized("Bad Credentials");
		}
	},
};
