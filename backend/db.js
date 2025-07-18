const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'landscaping_calculator',
  ***REMOVED***: process***REMOVED***.***REMOVED***,
  port: 5432,
});

module.exports = pool;