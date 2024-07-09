import App from "@app/http";

export const app = App.http
	.onStart(() => {
		console.log("Server started");
	})
	.onError((error) => {
		console.error(error);
	})
	.listen({
		port: App.port,
		hostname: App.hostname,
		development: App.dev,
		lowMemoryMode: App.lowMemoryMode,
		reusePort: App.reusePort,
	});
