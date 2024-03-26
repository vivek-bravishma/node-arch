import AuthorizationController from "../../../interfaces/controllers/AuthorizationController";

export default {
	name: "oauth",
	version: "1.0.0",
	register: async (server) => {
		server.auth.scheme("oauth", await import("./scheme"));
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
