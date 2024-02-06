import { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controllers/task/craete";
import { GetAllTaskController } from "../controllers/task/getAll";
import { UpdateTaskController } from "../controllers/task/update";
import { DeleteTaskController } from "../controllers/task/delete";

export const routes = async(app: FastifyInstance) => {
	app.post("/task",  new CreateTaskController().create);
	app.get("/task", new GetAllTaskController().get);
	app.put("/task/:id", new UpdateTaskController().update);
	app.delete("/task/:id", new DeleteTaskController().delete);
};