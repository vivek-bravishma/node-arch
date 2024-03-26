import constants from "./constants";

export default environment = (() => {
	const env = {
		database: {
			dialect:
				process.env.DATABASE_DIALECT ||
				constants.SUPPORTED_DATABASE.MONGO,
			url: process.env.DATABASE_URI || "",
		},
	};
	if (process.env.NODE_ENV === "test") {
		env.database = {
			driver: constants.SUPPORTED_DATABASE.IN_MEMORY,
		};
	}
	return env;
})();
