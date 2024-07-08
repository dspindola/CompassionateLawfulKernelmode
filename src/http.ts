import { get } from "./routes";
import { setup } from "./setup";

export const http = setup
	.get('/', get)
