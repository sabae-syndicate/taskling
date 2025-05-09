/**
 * This file was sourced from: https://github.com/seanpmaxwell/express5-typescript-template
 */

import { HttpStatusCodes } from "./http";
interface IValidationErrFormat {
	error: string;
	parameter: string;
	value?: unknown;
	"more-info"?: string;
}

/**
 * Error with status code and message.
 */
class RouteError extends Error {
	public status: HttpStatusCodes;

	public constructor(status: HttpStatusCodes, message: string) {
		super(message);
		this.status = status;
	}
}

/**
 * Validation in route layer errors.
 */
class ValidationErr extends RouteError {
	public static MSG = "The following parameter was missing or invalid.";

	public constructor(parameter: string, value?: unknown, moreInfo?: string) {
		const msgObj: IValidationErrFormat = {
			error: ValidationErr.MSG,
			parameter,
			value,
		};
		if (moreInfo) {
			msgObj["more-info"] = moreInfo;
		}
		super(HttpStatusCodes.BAD_REQUEST, JSON.stringify(msgObj));
	}
}

export { type IValidationErrFormat, RouteError, ValidationErr };
