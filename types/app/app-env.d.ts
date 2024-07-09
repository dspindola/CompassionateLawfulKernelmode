type Proto = "http" | "https";

type PortRange = 3000 | 3001 | 8000 | 8080 | 5173 | 5174;

type Host<T extends string> = "localhost" | "127.0.0.1" | T;

interface ServerEnv {
	APP_SERVER_PORT: PortRange;
	APP_SERVER_HOST: Host;
	APP_SERVER_PROTOCOL: Proto;
	APP_SERVER_NAME: string;
}

interface ClientEnv {
	APP_CLIENT_PORT: PortRange;
	APP_CLIENT_HOST: Host;
	APP_CLIENT_PROTOCOL: Proto;
	APP_CLIENT_NAME: string;
}

export interface AppEnv extends ServerEnv, ClientEnv {}
