import constants from "./constants";
import environment from "./environment";
import JwtAccessTokenManager from "../security/JwtAccessTokenManager";
import UserSerializer from "../../interfaces/serializers/UserSerializer";

export default async function buildBeans() {
	const beans = {
		accessTokenManager: new JwtAccessTokenManager(),
		userSerializer: new userSerializer(),
	};
	switch (environment.database.dialect) {
		case constants.SUPPORTED_DATABASE.IN_MEMORY:
			const UserRepositoryInMemory = await import(
				"../repositories/UserRepositoryInMemory"
			);
			beans.userRepository = new UserRepositoryInMemory();
			break;
		case constants.SUPPORTED_DATABASE.MONGO:
			const UserRepositoryMongo = await import(
				"../repositories/UserRepositoryMongo"
			);
			beans.userRepository = new UserRepositoryMongo();
			break;
		case constants.SUPPORTED_DATABASE.POSTGRESS:
			throw new Error("Add PostgreSql support");
			// beans.userRepository=new PostgresUserRepository();
			break;
		default:
			const UserRepositorySQLite = await import(
				"../repositories/UserRepositorySQLite"
			);
			beans.userRepository = new UserRepositorySQLite();
	}

	return beans;
}
