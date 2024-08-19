import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { analysis } from "$api/routes/analysis";

export const app = new Hono();
app.route("/analysis", analysis);

export const runServer = () =>
	serve(app, ({ address, port }) => {
		const _address = address === "0.0.0.0" ? "localhost" : address;

		console.log(`🚢 Running at: http://${_address}:${port}`);
	});
