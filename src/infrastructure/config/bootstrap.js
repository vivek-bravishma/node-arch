import "dotenv/config";
import constants from "./constants.js";
import environment from "./environment.js";

export default class Bootstrap {
	constructor() {
		this.env = environment;
	}

	async init() {
		switch (this.env.database.dialect) {
			case constants.SUPPORTED_DATABASE.MONGO:
				await this.initMongoose();
				break;
			case constants.SUPPORTED_DATABASE.POSTGRESS:
				await this.initSequelize();
				break;
			case constants.SUPPORTED_DATABASE.SQLITE:
				await this.initSequelize();
				break;
		}
	}

	async initMongoose() {
		//Connect to MongoDB
		//   require('../orm/mongoose/mongoose');
		await import("../orm/mongoose/mongoose.js");
	}

	async initInMemory() {
		//Initialize in-memory database
	}
	async initSequelize() {
		//Initialize in-memory database
		// const sequelize = require('../orm/sequelize/sequelize');
		const sequelize = (await import("../orm/sequelize/sequelize.js"))
			.default;

		try {
			await sequelize.sync();
			console.log("Connection to DB has been established successfully.");
		} catch (err) {
			console.error("Unable to connect to the database:", err);
		}
	}
}
