require('dotenv').config();
const {Pool} = require('pg');


// Set your PostgreSQL connection credentials
const pool = new Pool({
  user: process.env.PG_USER_NAME,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.PG_PORT,
  database: 'education_for_entegrity',
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};