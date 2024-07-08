import http from "./src/http";

const app = http
	.listen({
		hostname: "0.0.0.0",
		development: process.env.NODE_ENV !== "production",
		lowMemoryMode: true,
		id: "server",
		reusePort: true,
	});

console.log('%s', app.server?.url)