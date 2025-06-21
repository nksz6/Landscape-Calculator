const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'landscaping_calculator',
  ***REMOVED***: process***REMOVED***.***REMOVED***,
  // CORRECTED LINE: This should always be your PostgreSQL port, typically 5432.
  port: 5432,
});

module.exports = pool;