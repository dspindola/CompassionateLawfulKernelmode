import { setup } from "@app/setup";
export { mode } from "@app/setup";
import app from "@/src/app";
import api from "./api";

export const http = setup.use(app()).use(api());

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
