import { Sequelize, DataType } from "sequelize";
import environment from "../../config/environment";
import User from "./models/User";

const sequelize = new Sequelize(environment.database.url);

User(sequelize, DataType);

export default sequelize;
