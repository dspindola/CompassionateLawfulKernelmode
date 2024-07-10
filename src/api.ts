import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { elysiaObjectStoragePlugin } from "./plugins/storage";

export default () =>
	new Elysia<"/api">({
		prefix: "/api",
	})
		.use(swagger())
		.use(
			elysiaObjectStoragePlugin<"/storage">({
				prefix: "/storage",
				bucketId: "replit-objstore-090156f4-ff5a-4431-b7aa-c6ed330d5efb",
			}),
		)
		.get("/", () => "hi");
