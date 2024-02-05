import { FastifyReply, FastifyRequest } from "fastify";
import { Task } from "../../core/Task";
import { z } from "zod";

const querySchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
});

export class GetAllTaskController {
	public async get(request: FastifyRequest, reply: FastifyReply) {
		const { description, title } = querySchema.parse(request.query);
		
		if (description) {
			return reply.send(await new Task().findtaskByDescricao(description));
		}else if(title){
			return reply.send(await new Task().findtaskByTitulo(title));
		}else{			
			return reply.send(await new Task().getAlltask());
		}
	}
}