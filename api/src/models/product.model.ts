import pool from './connection';

const findAll = async () => {
  const [result] = await pool.execute('SELECT * FROM products');
  return result;
};

export default { findAll };
