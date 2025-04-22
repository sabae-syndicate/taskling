/* eslint-disable */

///////////////////////////////////////////////
// This is to show a complete test application;
///////////////////////////////////////////////

// const promise = require('bluebird'); // or any other Promise/A+ compatible library;

// const initOptions = {
//     promiseLib: promise // overriding the default (ES6 Promise);
// };

const pgp = require('pg-promise')();
// See also: http://vitaly-t.github.io/pg-promise/module-pg-promise.html

// Database connection details;
const cn = {
    host: 'taskling-db-1', // because we're using docker, we need to use the docker container name instead of localhost
    port: 5432, // 5432 is the default;
    database: 'db_name',
    user: 'user',
    password: 'S5hs83nd9JJ92n!',

    // to auto-exit on idle, without having to shut down the pool;
    // see https://github.com/vitaly-t/pg-promise#library-de-initialization
    allowExitOnIdle: true
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/packages/pg/lib/defaults.js

export const db = pgp(cn); // database instance;

db.any('select * from users')
    .then((data: any) => {
        console.log('DATA:', data); // print data;
    })
    .catch((error: any) => {
        console.log('ERROR:', error); // print the error;
    });
