import type { ProcessorSchemaType } from "$jobs/types";
import { sendEmailProcessor } from "./sendEmail";

export const processorSchema = {
	sendEmail: sendEmailProcessor,
} satisfies ProcessorSchemaType;
