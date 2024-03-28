import AuthorizationController from "../../../interfaces/controllers/AuthorizationController.js";

export default () => {
	return {
		authenticate: AuthorizationController.VerifyAccessToken,
	};
};
