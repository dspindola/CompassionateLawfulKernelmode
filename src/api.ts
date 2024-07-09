import type { setup } from "@app/setup";
import { get } from "@app/routes";

export default (app: typeof setup) => app.get("/", get);
