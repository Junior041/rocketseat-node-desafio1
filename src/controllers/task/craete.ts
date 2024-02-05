import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Task } from "../../core/Task";

const taskSchema = z.object({
	title: z.string(),
	description: z.string(),
}); 

export class CreateTaskController {
	public async create(request: FastifyRequest, reply: FastifyReply) {
		const data = taskSchema.parse(request.body);
		await new Task().createTask({title: data.title, description: data.description});
		return reply.send(data);	
	}
}