import { Queue } from "bullmq";

export const mainQueue = new Queue("main");

mainQueue.on("error", (err) => {
	console.log(err);
});

process.on("beforeExit", () => {
	mainQueue.drain();
});
