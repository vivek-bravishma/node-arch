import AuthorizationController from "../../../interfaces/controllers/AuthorizationController";

export default () => {
	return {
		authenticate: AuthorizationController.VerifyAccessToken,
	};
};
