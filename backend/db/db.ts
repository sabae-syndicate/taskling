const pgp = require("pg-promise")();
// See also: http://vitaly-t.github.io/pg-promise/module-pg-promise.html

// Database connection details;
const cn = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,

	// to auto-exit on idle, without having to shut down the pool;
	// see https://github.com/vitaly-t/pg-promise#library-de-initialization
	allowExitOnIdle: true,
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/packages/pg/lib/defaults.js

export const db = pgp(cn); // database instance;
