import { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controllers/task/craete";
import { GetAllTaskController } from "../controllers/task/getAll";
import { UpdateTaskController } from "../controllers/task/update";

export const routes = async(app: FastifyInstance) => {
	app.post("/task",  new CreateTaskController().create);
	app.get("/task", new GetAllTaskController().get);
	app.put("/task/:id", new UpdateTaskController().update);
};