import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	db.schema
		.createTable("reports")
		.addColumn("id", "integer", (c) => c.primaryKey().autoIncrement())
		.addColumn("created_at", "datetime", (c) =>
			c.defaultTo(sql`CURRENT_TIMESTAMP`),
		)
		.addColumn("url", "text", (c) => c.notNull())
		.addColumn("performance_score", "numeric")
		.addColumn("accessibility_score", "numeric")
		.addColumn("best_practices_score", "numeric")
		.addColumn("seo_score", "numeric")
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	db.schema.dropTable("reports").ifExists().execute();
}
