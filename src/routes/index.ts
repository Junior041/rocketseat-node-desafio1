import { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controllers/task/craete";
import { GetAllTaskController } from "../controllers/task/getAll";
import { UpdateTaskController } from "../controllers/task/update";
import { DeleteTaskController } from "../controllers/task/delete";
import { ImportCsvController } from "../controllers/task/importCsv";
import multer from "fastify-multer";
import fastifyMultipart from "@fastify/multipart";


const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const routes = async(app: FastifyInstance) => {
	app.post("/task",  new CreateTaskController().create);
	app.get("/task", new GetAllTaskController().get);
	app.put("/task/:id", new UpdateTaskController().update);
	app.delete("/task/:id", new DeleteTaskController().delete);

	app.register(fastifyMultipart);
	app.post("/csv/task", {preHandler: upload.single("file")}, new ImportCsvController().import);
};