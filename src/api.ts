import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export default () =>
	new Elysia<"/api">({
		prefix: "/api",
	})
		.use(swagger())
		.get("/", () => "hi");
