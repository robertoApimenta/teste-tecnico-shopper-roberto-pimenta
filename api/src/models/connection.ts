import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 33060;

const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  port,
  database: process.env.MYSQL_DATABASE || 'shopper',
});

export default pool;

