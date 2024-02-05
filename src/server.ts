import { app } from "./app";
import { env } from "./config/env";

app.listen({
	port: env.PORT
}).then(() => {
	console.log(`Rodando na porta ${env.PORT}`);
});
