import Boom from "@hapi/boom";
import ListUsers from "../../application/use_cases/ListUsers";
import CreateUser from "../../application/use_cases/CreateUser";
import GetUser from "../../application/use_cases/GetUser";
import DeleteUser from "../../application/use_cases/DeleteUser";

export default UserController = {
	async createUser(request) {
		const serviceLocator = request.server.app.serviceLocator;
		const { firstName, lastName, email, password } = request.payload;

		const user = await CreateUser({
			firstName,
			lastName,
			email,
			password,
			serviceLocator,
		});

		return serviceLocator.userSerializer.serialize(user);
	},

	async findUsers(request) {
		const serviceLocator = request.server.app.serviceLocator;

		const users = await ListUsers(serviceLocator);
		return users.map(serviceLocator.userSerializer.serialize);
	},

	async getUser(request) {
		const serviceLocator = request.server.app.serviceLocator;
		const userId = request.params.id;
		const user = await GetUser(userId, serviceLocator);

		if (!user) {
			return Boom.notFound("User not found");
		}

		return serviceLocator.userSerializer.serialize(user);
	},

	async deleteUser(request, h) {
		const serviceLocator = request.server.app.serviceLocator;
		const userId = request.params.id;
		await DeleteUser(userId, serviceLocator);
		return h.response().code(204);
	},
};
