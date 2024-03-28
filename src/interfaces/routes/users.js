import UserController from "../controllers/UserController.js";
import {
	getUserByIdSchema,
	createUserSchema,
	updateUserSchema,
} from "../validationSchemas/user/index.js";

const usersRoutes = {
	name: "users",
	version: "1.0.0",
	register: async (server) => {
		server.route([
			{
				method: "GET",
				path: "/users",
				handler: UserController.findUsers,
				options: {
					description: "List all users",
					tags: ["api"],
				},
			},
			{
				method: "GET",
				path: "/users/{id}",
				handler: UserController.getUser,
				options: {
					description: "Get a user by its {id}",
					tags: ["api"],
					validate: {
						params: getUserByIdSchema,
					},
				},
			},
			{
				method: "POST",
				path: "/users",
				handler: UserController.createUser,
				options: {
					description: "Create a user",
					tags: ["api"],
					validate: {
						payload: createUserSchema,
					},
				},
			},
			{
				method: "PATCH",
				path: "/users/{id}",
				handler: UserController.updateUser,
				options: {
					description: "Update user",
					tags: ["api"],
					validate: {
						params: getUserByIdSchema,
						payload: updateUserSchema,
					},
				},
			},
			{
				method: "DELETE",
				path: "/users/{id}",
				handler: UserController.deleteUser,
				options: {
					description: "Delete a user by its {id}",
					tags: ["api"],
					validate: {
						params: getUserByIdSchema,
					},
				},
			},
		]);
	},
};

export default usersRoutes;
