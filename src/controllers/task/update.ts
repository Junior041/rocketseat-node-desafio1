import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Task } from "../../core/Task";

const taskSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
}); 

const idSchema = z.object({
	id: z.coerce.string()
});

export class UpdateTaskController {
	public async update(request: FastifyRequest, reply: FastifyReply) {
		const data = taskSchema.parse(request.body);
		const { id } = idSchema.parse(request.params);		
		const response = await new Task().updateTaskById({title: data.title, description: data.description, id});
		return reply.send(response);	
	}
}