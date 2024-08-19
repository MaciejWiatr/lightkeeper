import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { defineSandboxedProcessor } from "../helpers";
import { db } from "$db/client";

export default defineSandboxedProcessor("collectReport", async (job) => {
	const { url } = job.data;

	const chrome = await chromeLauncher.launch({
		chromeFlags: ["--headless", "--disable-dev-shm-usage"],
	});

	console.log(`Processing report for ${url}`);

	const runnerResult = await lighthouse(url, {
		logLevel: "silent",
		port: chrome.port,
	});

	const scores = {
		accessibilityScore: runnerResult?.lhr.categories.accessibility.score,
		bestPracticesScore: runnerResult?.lhr.categories["best-practices"].score,
		performanceScore: runnerResult?.lhr.categories.performance.score,
		seoScore: runnerResult?.lhr.categories.seo.score,
	};

	const report = await db
		.insertInto("reports")
		.values({
			url,
			...scores,
		})
		.returningAll()
		.executeTakeFirst();

	console.log(`Generated report: ${report?.id} for url ${report?.url}`);

	chrome.kill();
});
