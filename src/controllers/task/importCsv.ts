import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import csvParser from "csv-parser";
import { Task } from "../../core/Task";

export class ImportCsvController {
	public async import(request: FastifyRequest, reply: FastifyReply) {
		try {
			const fileStream = fs.createReadStream("./tasks.csv");

			const tasks: Array<{ title: string; description: string }> = [];

			fileStream
				.pipe(csvParser())
				.on("data", (data) => {
					tasks.push({
						title: data.title,
						description: data.description,
					});
				})
				.on("end", async () => {
					for (const task of tasks) {
						await new Task().createTask(task);
					}
					return reply.send("Importação concluída com sucesso");
				});

			fileStream.on("error", () => {
				return reply.status(500).send("Erro interno do servidor");
			});
		} catch (error) {
			return reply.status(500).send("Erro interno do servidor");
		}
	}
}
