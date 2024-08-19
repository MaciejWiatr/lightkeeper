import { mainQueue } from "./jobs/queue";
import { runServer } from "$api/server";
import { spawnWorkers } from "$jobs/workers";
import { jobSchema } from "$jobs/schema";
import { scheduleJob } from "$jobs/helpers";

process.on("exit", () => {
	console.log("Bye 👋");
	mainQueue.drain();
});

await spawnWorkers(jobSchema, mainQueue, 2);

scheduleJob("collectReport", { url: "https://example.com" });

runServer();
