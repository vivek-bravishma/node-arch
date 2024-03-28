import User from "../../domain/User.js";
import MongooseUser from "../orm/mongoose/schemas/User.js";

import UserRepository from "../../domain/UserRepository.js";

export default class UserRepositoryMongo extends UserRepository {
	constructor() {
		super();
	}

	async persist(userEntity) {
		const { firstName, lastName, email, password } = userEntity;
		const mongooseUser = new MongooseUser({
			firstName,
			lastName,
			email,
			password,
		});
		await mongooseUser.save();
		return new User(
			mongooseUser._id,
			mongooseUser.firstName,
			mongooseUser.lastName,
			mongooseUser.email,
			mongooseUser.password
		);
	}
	async merge(userEntity) {
		const { id, firstName, lastName, email, password } = userEntity;
		const mongooseUser = await MongooseUser.findByIdAndUpdate(id, {
			firstName,
			lastName,
			email,
			password,
		});
		return new User(
			mongooseUser.id,
			mongooseUser.firstName,
			mongooseUser.lastName,
			mongooseUser.email,
			mongooseUser.password
		);
	}
	async remove(userId) {
		return MongooseUser.findOneAndDelete(userId);
	}
	async get(userId) {
		const mongooseUser = await MongooseUser.findById(userId);
		return new User(
			mongooseUser.id,
			mongooseUser.firstName,
			mongooseUser.lastName,
			mongooseUser.email,
			mongooseUser.password
		);
	}
	async getByEmail(userEmail) {
		const mongooseUser = await MongooseUser.find({ email: userEmail });
		return new User(
			mongooseUser.id,
			mongooseUser.firstName,
			mongooseUser.lastName,
			mongooseUser.email,
			mongooseUser.password
		);
	}
	async find() {
		const mongooseUsers = await MongooseUser.find();
		return mongooseUsers.map((mongooseUser) => {
			return new User(
				mongooseUser.id,
				mongooseUser.firstName,
				mongooseUser.lastName,
				mongooseUser.email,
				mongooseUser.password
			);
		});
	}
}
