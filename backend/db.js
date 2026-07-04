import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'solarsonform_db',
  password: 'Potti2820',
  port: 2820,
});

export default pool;