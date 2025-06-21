const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'landscaping_calculator',
  password: process.env.DB_PASSWORD,
  // CORRECTED LINE: This should always be your PostgreSQL port, typically 5432.
  port: 5432,
});

module.exports = pool;