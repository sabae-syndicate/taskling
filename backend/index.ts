import server from "./server";

// Get port from environment and store in Express.
const PORT = normalizePort(process.env.PORT || "8000");

server.listen(PORT, () => {
	switch (process.env.ENVIRONMENT) {
		case "dev":
			return console.info(
				`\n   🌱 Taskling - Backend 🌱\nReady at http://localhost:${PORT}\n`,
			);
		default:
			return console.info(
				`\n   🌱 Taskling - Backend 🌱\nReady at https://${process.env.HOST}:${PORT}\n`,
			);
	}
});

/**
 * Normalize a port into a number or string.
 */
function normalizePort(val: number | string): number | string {
	let port = -1;
	if (typeof val === "number") {
		port = val;
	} else {
		port = Number.parseInt(val, 10);
	}

	if (port >= 0) {
		return port;
	}
	throw new Error("Invalid port specified.");
}
