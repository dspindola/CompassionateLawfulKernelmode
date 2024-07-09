import { defineClient } from "./client";

export const db = defineClient({
	path: Bun.env.DB_PATH,
	name: "bun",
});
