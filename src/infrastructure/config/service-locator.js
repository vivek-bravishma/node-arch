import constants from "./constants.js";
import environment from "./environment.js";
import JwtAccessTokenManager from "../security/JwtAccessTokenManager.js";
import UserSerializer from "../../interfaces/serializers/UserSerializer.js";

export default async function buildBeans() {
	const beans = {
		accessTokenManager: new JwtAccessTokenManager(),
		userSerializer: new UserSerializer(),
	};
	switch (environment.database.dialect) {
		case constants.SUPPORTED_DATABASE.IN_MEMORY:
			const UserRepositoryInMemory = (
				await import("../repositories/UserRepositoryInMemory.js")
			).default;
			beans.userRepository = new UserRepositoryInMemory();
			break;
		case constants.SUPPORTED_DATABASE.MONGO:
			const UserRepositoryMongo = (
				await import("../repositories/UserRepositoryMongo.js")
			).default;
			beans.userRepository = new UserRepositoryMongo();
			break;
		case constants.SUPPORTED_DATABASE.POSTGRESS:
			throw new Error("Add PostgreSql support");
			// beans.userRepository=new PostgresUserRepository();
			break;
		default:
			const UserRepositorySQLite = (
				await import("../repositories/UserRepositorySQLite.js")
			).default;

			beans.userRepository = new UserRepositorySQLite();
	}

	return beans;
}
