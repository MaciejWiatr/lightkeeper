import { defineConfig } from "kysely-ctl";
import { db } from "./db/client";

export default defineConfig({
	kysely: db,
	migrations: {
		migrationFolder: "db/migrations",
	},
	seeds: {
		seedFolder: "db/seeds",
	},
});
