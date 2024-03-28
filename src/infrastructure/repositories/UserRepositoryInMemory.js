import User from "../../domain/User.js";
import UserRepository from "../../domain/UserRepository.js";

export default class UserRepositoryInMemory extends UserRepository {
	_initializeRepositoryWithTwoUsers() {
		const john = new User(
			null,
			"John",
			"Doe",
			"john.doe@gmail.com",
			"12345678"
		);

		const jane = new User(
			null,
			"Jane",
			"Doe",
			"jane.doe@gmail.com",
			"87654321"
		);

		this.persist(john).then(() => this.persist(jane));
	}

	_dataAsArray() {
		return Object.keys(this.data).map((key) => this.data[key]);
	}

	constructor() {
		super();
		this.index = 1;
		this.data = {};
		this._initializeRepositoryWithTwoUsers();
	}

	persist(userEntity) {
		const row = Object.assign({}, userEntity);
		const rowId = this.index++;
		row.id = rowId;
		this.data[rowId] = row;
		return Promise.resolve(row);
	}
	merge(userEntity) {
		let row = this.data[userEntity.id];
		Object.assign(row, userEntity);
		return Promise.resolve(row);
	}

	remove(userId) {
		delete this.data[userId];
		return Promise.resolve();
	}
	get(userId) {
		return Promise.resolve(this.data[userId]);
	}
	getByEmail(userEmail) {
		const users = this._dataAsArray();
		return Promise.resolve(users.find((user) => user.email === userEmail));
	}
	find() {
		return Promise.resolve(this._dataAsArray());
	}
}
