import fastify from "fastify";
import { ZodError } from "zod";
import { routes } from "./routes";

export const app = fastify();
app.register(routes);
app.setErrorHandler((error, _, reply) => {
	console.error(error);
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: "Validations error.", issues: error.format() });
	}
	return reply.status(400).send({ message: "Internal Server Error." });
});
