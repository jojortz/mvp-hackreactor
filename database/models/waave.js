require("dotenv").config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const userQuery = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  region_name TEXT,
  region_id TEXT,
  address TEXT,
  max_wave_ht INT,
  min_wave_ht INT
);`

const sessionsQuery = `CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  url TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);`

pool.query(userQuery)
.then((result) => {
  console.log('SUCCESS: Created user table');
})
.catch(e => console.error(e.stack));

module.exports = {
  pool
}