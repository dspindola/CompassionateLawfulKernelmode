import { tsxResponse } from "$/libs/tsx/response";
import { Elysia } from "elysia";
import { $route } from "../libs/tsx/route";

export const ROUTES = async () => ({
	index: await import("@app/routes").then((m) => m.default),
	about: await import("@app/routes/about").then((m) => m.default),
});

export default ({
	store,
}: {
	store: { routes: { [k: string]: ReturnType<ReturnType<typeof $route>> } };
}) =>
	(app: Elysia) =>
		app
			.mapResponse((context) => {
				console.log(app.store);

				if (!context.path.startsWith("/api/")) {
					return tsxResponse(context);
				}
			})
			.get("/", store.routes.index.get)
			.get("/about", store.routes.about.get);
