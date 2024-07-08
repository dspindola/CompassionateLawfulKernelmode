import { http } from "./http";
import { mode } from "./setup";

const app = http
	.listen({
		port: process.env.PORT,
		hostname: process.env.HOSTNAME,
		development: mode === "dev",
		lowMemoryMode: process.env.LOW_MEMORY_MODE === "1",
		id: "server",
		reusePort: process.env.REUSE_PORT === "1",
	});

console.log('%s', app.server?.url)