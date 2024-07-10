import { $route } from "@gyoza/route";

export default $route(import.meta)(({ path }) => <p>{path}</p>);
