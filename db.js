const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "Seleka11",
	host: "localhost",
	port: 5432,
	database: "jwt_auth_pern",
});

module.exports = pool;
