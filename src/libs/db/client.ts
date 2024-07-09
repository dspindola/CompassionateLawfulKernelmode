import { createDatabase } from "db0";
import bunSqlite from "db0/connectors/bun-sqlite";

export const defineClient = ({
	path,
	name = "bun",
}: {
	path: string;
	name: string;
}) =>
	createDatabase(
		bunSqlite({
			cwd: process.cwd(),
			path,
			name,
		}),
	);
