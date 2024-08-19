import type { Job, JobsOptions, Processor, SandboxedJob } from "bullmq";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { existsSync } from "node:fs";

import { mainQueue } from "$jobs/queue";
import type {
	JobInput,
	JobName,
	NotSandboxedJobKeys,
	SandboxedJobKeys,
} from "$jobs/types";
import { jobSchema } from "$jobs/schema";

export const scheduleJob = <T extends JobName>(
	name: T,
	data: JobInput<T>,
	opts?: JobsOptions,
) => {
	return mainQueue.add(name, jobSchema[name].input.parse(data), opts);
};

type DiffJobType<T extends JobName> = JobName extends SandboxedJobKeys
	? SandboxedJob
	: Job;

export const defineProcessor = <T extends JobName>(
	_jobName: T,
	processor: (job: Job<JobInput<T>>) => Promise<void>,
) => processor;

export const defineSandboxedProcessor = <T extends JobName>(
	_jobName: T,
	processor: (job: SandboxedJob<JobInput<T>>) => Promise<void>,
) => processor;

export const getSandboxedProcessor = async (jobName: SandboxedJobKeys) => {
	const _path = path.join(
		process.cwd(),
		`jobs/sandboxed-processors/${jobName}.ts`,
	);

	if (!existsSync(_path)) {
		throw `Sandboxed processor for ${jobName} doesn't exist in jobs/processors dir!`;
	}

	return pathToFileURL(_path);
};
