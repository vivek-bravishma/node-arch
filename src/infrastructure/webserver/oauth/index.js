import AuthorizationController from "../../../interfaces/controllers/AuthorizationController.js";
import scheme from "./scheme.js";

export default {
	name: "oauth",
	version: "1.0.0",
	register: (server) => {
		server.auth.scheme("oauth", scheme);
		server.auth.strategy("oauth-jwt", "oauth");
		server.route([
			{
				method: "POST",
				path: "/oauth/token",
				handler: AuthorizationController.getAccessToken,
				options: {
					description: "Return an OAuth 2 access token",
					tags: ["api"],
				},
			},
		]);
	},
};
