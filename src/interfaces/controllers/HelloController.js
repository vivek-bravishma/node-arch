import SayHello from "../../application/use_cases/SayHello.js";

const HelloController = {
	sayHelloWorld() {
		return SayHello();
	},

	sayHelloPerson(request) {
		return SayHello(request.params.name);
	},
};

export default HelloController;
