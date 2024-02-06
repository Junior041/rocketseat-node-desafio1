import { FastifyReply, FastifyRequest } from "fastify";
import { Task } from "../../core/Task";
import { z } from "zod";

const idSchema = z.object({
	id: z.string(),
});

export class DeleteTaskController {
	public async delete(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		return reply.send(await new Task().deleteTaskById(id));
	}
}