import SayHello from "../../application/use_cases/SayHello";

export default HelloController = {
	sayHelloWorld() {
		return SayHello();
	},

	sayHelloPerson(request) {
		return SayHello(request.params.name);
	},
};
