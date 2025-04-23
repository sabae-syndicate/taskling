import { apiReference } from "@scalar/express-api-reference";
import cors from "cors";
import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import helmet from "helmet";
import morgan from "morgan";

import { RegisterRoutes } from "./routes/routes";
import { Errors } from "./types";

const path = require("node:path");
const app = express();

// Configure middleware
app.use(
	cors({
		origin: [process.env.FE_URL || ""],
	}),
);

if (process.env.ENVIRONMENT === "dev") {
	// Log routes called during development
	app.use(morgan("dev"));
} else {
	// When ready to deploy, configure helmet
	// https://helmetjs.github.io/
	app.use(
		helmet({
			contentSecurityPolicy: true,
		}),
	);
}

// Add all routes bundled by tsoa
// Note: generate routes.ts with `pnpm --filter=backend generate`
RegisterRoutes(app);

// Add API documentation via Scalar
app.use("/api/openapi.json", express.static(path.resolve("dist/openapi.json")));
app.use(
	"/api/scalar.js",
	express.static(
		"node_modules/@scalar/api-reference/dist/browser/standalone.js",
	),
);
app.use(
	"/api/docs",
	apiReference({
		theme: "deepSpace",
		url: "/api/openapi.json",
		cdn: "/api/scalar.js",
		proxyUrl: process.env.FE_URL,
	}),
);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	if (process.env.ENVIRONMENT === "dev") {
		console.error(err);
	}
	if (err instanceof Errors.RouteError) {
		const status = err.status;
		res.status(status).json({ error: err.message });
	}
	return next(err);
});

export default app;
