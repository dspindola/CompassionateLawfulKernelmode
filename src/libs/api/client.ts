import { treaty } from "@elysiajs/eden";
import type App from "../../server/$.http";

export const createTreatyClient = (domain: string) =>
	treaty<typeof App.http>(domain);
