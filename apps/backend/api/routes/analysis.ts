import { scheduleJob } from "$jobs/helpers";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const analysis = new Hono();

analysis.post(
	"/analyze",
	zValidator(
		"json",
		z.object({
			url: z.string(),
		}),
	),
	async (c) => {
		const { url } = c.req.valid("json");

		const job = await scheduleJob("collectReport", { url });

		if (!job.id) {
			throw "Job was not scheduled";
		}

		return c.json({
			message: `${url} analysis started`,
			jobId: job.id,
			time: new Date().toTimeString(),
		});
	},
);
