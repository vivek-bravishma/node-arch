import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Blipp from "blipp";
import hapiswagger from "hapi-swagger";

export default createServer = async () => {
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

	await server.register([
		await import("./oauth"),
		await import("../../interfaces/routes/hello"),
		await import("../../interfaces/routes/private"),
		await import("../../interfaces/routes/users"),
	]);

	server.app.serviceLocator = await import(
		"../../infrastructure/config/service-locator"
	);

	return server;
};
