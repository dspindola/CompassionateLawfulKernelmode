import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export default ({
	docs: { path },
}: {
	docs: {
		path: string;
	};
}) =>
	(app: Elysia) =>
		app.group("/api", (api) =>
			api
				.use(
					swagger({
						path: path,
					}),
				)
				.get("/", () => "hi"),
		);
