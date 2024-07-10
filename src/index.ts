import App from "@app/http";

const app = App.http.listen({
	port: App.port,
	hostname: App.hostname,
	development: App.dev,
	lowMemoryMode: App.lowMemoryMode,
	reusePort: App.reusePort,
});
