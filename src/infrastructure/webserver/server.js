import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Blipp from "blipp";
import hapiswagger from "hapi-swagger";
import Joi from "joi";

import oauth from "./oauth/index.js";
import helloRoutes from "../../interfaces/routes/hello.js";
import privateRoutes from "../../interfaces/routes/private.js";
import usersRoutes from "../../interfaces/routes/users.js";

import buildBeans from "../../infrastructure/config/service-locator.js";

const createServer = async () => {
	const server = Hapi.server({ port: process.env.PORT || 3000 });

	await server.register([
		Blipp,
		Inert,
		Vision,
		{
			plugin: hapiswagger,
			options: {
				info: { title: "Test API Documentation", version: "1.0.0" },
			},
		},
	]);

	await server.register([oauth, helloRoutes, privateRoutes, usersRoutes]);

	// await server.register([
	// 	await import("./oauth/index.js"),
	// 	await import("../../interfaces/routes/hello.js"),
	// 	await import("../../interfaces/routes/private.js"),
	// 	await import("../../interfaces/routes/users.js"),
	// ]);

	server.app.serviceLocator = await buildBeans();

	// server.app.serviceLocator = await import(
	// 	"../../infrastructure/config/service-locator.js"
	// );

	return server;
};

export default createServer;
