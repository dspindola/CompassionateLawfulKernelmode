import { treaty } from "@elysiajs/eden";
import type App from "../../http";

export const createTreatyClient = (domain: string) =>
	treaty<typeof App.http>(domain);
