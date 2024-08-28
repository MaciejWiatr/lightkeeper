import { z } from "zod";
import type { JobSchemaType, ProcessorSchemaType } from "./types";

export const jobSchema = {
	collectReport: {
		type: "sandboxed",
		workers: 2,
		input: z.object({
			url: z.string().url(),
		}),
	},
	sendEmail: {
		type: "default",
		input: z.object({
			to: z.string(),
			body: z.string(),
		}),
	},
} satisfies JobSchemaType;
