import type { AppEnv } from "../app/app-env";
import type { ReplitEnv } from "../replit/replit-env";

declare module "bun" {
	interface Env extends ReplitEnv, AppEnv {
		NODE_ENV: "development" | "production";
		MODE: "development" | "production";
		DEBUG: "0" | "1";
		DEV: boolean;
		PROD: boolean;
		DB_PATH: string;
		DB_PROVIDER: "sqlite";
	}
}
