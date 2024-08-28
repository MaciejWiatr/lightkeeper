import { SqliteDialect, Kysely, CamelCasePlugin } from "kysely";
import SQLite from "better-sqlite3";
import type { DB } from "./types";

const dialect = new SqliteDialect({
	database: new SQLite("db.sqlite"),
});

export const db = new Kysely<DB>({
	dialect,
	plugins: [new CamelCasePlugin()],
	log: ["query", "error"],
});
