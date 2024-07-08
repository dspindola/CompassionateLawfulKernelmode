import http from "./http";

const app = http
	.listen({
		port: process.env.PORT,
		hostname: process.env.HOSTNAME,
		development: process.env.NODE_ENV !== "production",
		lowMemoryMode: process.env.LOW_MEMORY_MODE === "1",
		id: "server",
		reusePort: process.env.REUSE_PORT === "1",
	});

console.log('%s', app.server?.url)