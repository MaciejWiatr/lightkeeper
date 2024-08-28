import { type Queue, Worker } from "bullmq";
import type { JobSchemaType, SandboxedJobKeys } from "./types";
import { getSandboxedProcessor } from "./helpers";

const workerOptions = {
	connection: { host: "localhost", port: 6379 },
};

export const spawnWorkers = async (
	globalSchema: JobSchemaType,
	queue: Queue,
	normalWorkers = 2,
) => {
	const workers = [];

	for (const [jName, jSchema] of Object.entries(globalSchema)) {
		if (jSchema.type !== "sandboxed") continue;

		for (let i = 0; i < jSchema.workers; i++) {
			const w = new Worker(
				queue.name,
				await getSandboxedProcessor(jName as SandboxedJobKeys),
				workerOptions,
			);

			w.on("error", console.log);

			console.log(`Spawned sandbox worker for ${jName}`);

			workers.push(w);
		}
	}

	// for (let i = 0; i < normalWorkers; i++) {
	// 	const w = new Worker(
	// 		queue.name,
	// 		async (j) => {
	// 			console.log("Recieved job", j.name);

	// 			if (Object.keys(processorSchema).includes(j.name)) {
	// 				await processorSchema[j.name as keyof ProcessorSchemaType](j);
	// 			}

	// 			return;
	// 		},
	// 		workerOptions,
	// 	);

	// 	console.log("Spawned normal worker");
	// 	workers.push(w);
	// }
};
