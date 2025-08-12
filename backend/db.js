const { Pool } = require('pg');
require('dotenv').config();

//production config
const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

//dev/local config
const devConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'landscaping_calculator',
  password: process.env.DB_PASSWORD,
  port: 5432,
};

//if DATABASE_URL set use the production config, otherwise use dev config
const pool = new Pool(process.env.DATABASE_URL ? proConfig : devConfig);

module.exports = pool;