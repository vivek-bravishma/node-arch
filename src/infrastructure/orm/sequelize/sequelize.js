import { Sequelize } from "sequelize";
import environment from "../../config/environment.js";
import User from "./models/User.js";

console.log("db uri", environment.database.url);
const sequelize = new Sequelize({
	dialect: environment.database.dialect,
	storage: environment.database.url,
});

User(sequelize, Sequelize);

export default sequelize;
