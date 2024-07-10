import Index from "@app/routes";
import About from "./routes/about";
import { tsxResponse } from "$/libs/tsx/response";
import Elysia from "elysia";

export default () =>
	new Elysia()
		.mapResponse((context) => {
			if (!context.path.startsWith("/api/")) {
				return tsxResponse(context);
			}
		})
		.get("/", Index.get)
		.get("/about", About.get);
