import User from "../../domain/User.js";
import UserRepository from "../../domain/UserRepository.js";
import sequelize from "../orm/sequelize/sequelize.js";

export default class UserRepositorySQLite extends UserRepository {
	constructor() {
		super();
		this.db = sequelize;
		this.model = this.db.model("user");
	}

	async persist(userEntity) {
		const { firstName, lastName, email, password } = userEntity;
		const seqUser = await this.model.create({
			firstName,
			lastName,
			email,
			password,
		});
		await seqUser.save();

		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}
	async merge(userEntity) {
		const { id, firstName, lastName, email, password } = userEntity;

		const seqUser = await this.model.findByPk(id);
		if (!seqUser) return false;

		await seqUser.update({ firstName, lastName, email, password });

		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}
	async remove(userId) {
		const seqUser = await this.model.findByPk(userId);
		if (seqUser) {
			return seqUser.destroy();
		}
		return false;
	}
	async get(userId) {
		const seqUser = await this.model.findByPk(userId);
		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}
	async getByEmail(userEmail) {
		const seqUser = await this.model.findOne({
			where: { email: userEmail },
		});
		return new User(
			seqUser.id,
			seqUser.firstName,
			seqUser.lastName,
			seqUser.email,
			seqUser.password
		);
	}
	async find() {
		const seqUsers = await this.model.findAll();
		return seqUsers.map((seqUser) => {
			return new User(
				seqUser.id,
				seqUser.firstName,
				seqUser.lastName,
				seqUser.email,
				seqUser.password
			);
		});
	}
}
