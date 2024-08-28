import type { Processor } from "bullmq";
import type { jobSchema } from "./schema";
import type { z } from "zod";

export type JobSchemaType = {
	[key: string]:
		| {
				input: unknown;
				type: "sandboxed";
				workers: number;
		  }
		| { input: unknown; type: "default" };
};

export type JobSchema = typeof jobSchema;
export type JobName = keyof JobSchema;
export type JobInput<T extends keyof JobSchema> = z.infer<
	JobSchema[T]["input"]
>;
export type SandboxedJobs<T extends JobSchemaType> = {
	[K in keyof T]: T[K]["type"] extends "sandboxed" ? K : never;
}[keyof T];
export type SandboxedJobKeys = SandboxedJobs<typeof jobSchema>;
export type NotSandboxedJobKeys = Exclude<JobName, SandboxedJobKeys>;

export type ProcessorSchemaType = {
	[key in NotSandboxedJobKeys]: Processor<JobInput<key>>;
};
