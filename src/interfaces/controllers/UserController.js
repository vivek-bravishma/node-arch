import Boom from "@hapi/boom";
import ListUsers from "../../application/use_cases/ListUsers.js";
import CreateUser from "../../application/use_cases/CreateUser.js";
import GetUser from "../../application/use_cases/GetUser.js";
import DeleteUser from "../../application/use_cases/DeleteUser.js";
import UpdateUser from "../../application/use_cases/UpdateUser.js";

const UserController = {
	async createUser(request) {
		const serviceLocator = request.server.app.serviceLocator;
		const { firstName, lastName, email, password } = request.payload;

		const user = await CreateUser(
			firstName,
			lastName,
			email,
			password,
			serviceLocator
		);

		return serviceLocator.userSerializer.serialize(user);
	},

	async updateUser(request) {
		const serviceLocator = request.server.app.serviceLocator;

		const userId = request.params.id;
		const { firstName, lastName, email, password } = request.payload;

		const user = await UpdateUser(userId, request.payload, serviceLocator);

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

export default UserController;
