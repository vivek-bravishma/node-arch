import { sign, verify, decode } from "jsonwebtoken";
import AccessTokenManager from "../../application/security/AccessTokenManager";

const JWT_SECRET_KEY = "mysecretkey";

export default class JwtAccessTokenManager extends AccessTokenManager {
	generate(payload) {
		return sign(payload, JWT_SECRET_KEY);
	}
	decode(accessToken) {
		return verify(accessToken, JWT_SECRET_KEY);
	}
}
