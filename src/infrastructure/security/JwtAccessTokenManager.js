import jwt from "jsonwebtoken";
import AccessTokenManager from "../../application/security/AccessTokenManager.js";

const JWT_SECRET_KEY = "mysecretkey";

export default class JwtAccessTokenManager extends AccessTokenManager {
	generate(payload) {
		return jwt.sign(payload, JWT_SECRET_KEY);
	}
	decode(accessToken) {
		return jwt.verify(accessToken, JWT_SECRET_KEY);
	}
}
