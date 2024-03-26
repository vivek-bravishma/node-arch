import UserController from "../controllers/UserController";

export default usersRoutes = {
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
				},
			},
			{
				method: "POST",
				path: "/users",
				handler: UserController.createUser,
				options: {
					description: "Create a user",
					tags: ["api"],
				},
			},
			{
				method: "DELETE",
				path: "/users/{id}",
				handler: UserController.deleteUser,
				options: {
					description: "Delete a user by its {id}",
					tags: ["api"],
				},
			},
		]);
	},
};
