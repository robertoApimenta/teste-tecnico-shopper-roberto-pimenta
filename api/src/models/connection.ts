import mysql, { Pool } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 33060,
  database: 'shopper',
});

export default pool;

