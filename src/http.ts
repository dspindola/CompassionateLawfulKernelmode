import { setup } from "@app/setup";
export { mode } from "@app/setup";
import api from "@app/api";

export const http = api(setup);

export const port = process.env.PORT;
export const hostname = process.env.HOSTNAME;
export const reusePort = process.env.REUSE_PORT === "1";
export const lowMemoryMode = process.env.LOW_MEMORY_MODE === "1";
export const dev = process.env.NODE_ENV === "development";

export default {
	http,
	port,
	hostname,
	reusePort,
	lowMemoryMode,
	dev,
};
