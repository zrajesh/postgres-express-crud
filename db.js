const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const Pool = pg.Pool;

const pool = new Pool({
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DB
});

module.exports = pool;
