import constants from "./constants.js";

const environment = (() => {
	const env = {
		// database: {
		// 	dialect:
		// 		process.env.DATABASE_DIALECT ||
		// 		constants.SUPPORTED_DATABASE.MONGO,
		// 	url:
		// 		process.env.DATABASE_URI ||
		// 		"mongodb+srv://vivek:xmM6t85qbIHWlgZx@vivek-custer.kk8uhws.mongodb.net/avaya?retryWrites=true&w=majority&appName=ViveK-Custer",
		// },
		database: {
			dialect:
				process.env.DATABASE_DIALECT ||
				constants.SUPPORTED_DATABASE.SQLITE,
			url: process.env.DATABASE_URI || "./test.db",
		},
	};
	if (process.env.NODE_ENV === "test") {
		env.database = {
			driver: constants.SUPPORTED_DATABASE.IN_MEMORY,
		};
	}
	return env;
})();

export default environment;
