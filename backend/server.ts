import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import helmet from "helmet";
import morgan from "morgan";

import BaseRouter from "./routes";
import { RouteError } from "./types";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (process.env.ENVIRONMENT === "dev") {
	app.use(morgan("dev"));
} else if (process.env.ENVIRONMENT === "production") {
	// When ready to deploy, configure helmet
	// https://helmetjs.github.io/
	app.use(
		helmet({
			contentSecurityPolicy: true,
		}),
	);
}

// Add APIs, must be after middleware
app.use("/", BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	if (process.env.ENVIRONMENT === "dev") {
		console.error(err);
	}
	if (err instanceof RouteError) {
		const status = err.status;
		res.status(status).json({ error: err.message });
	}
	return next(err);
});

export default app;
