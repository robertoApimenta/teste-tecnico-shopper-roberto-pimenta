import pool from './connection';

const findAll = async () => {
  const [result] = await pool.execute('SELECT * FROM products'); // dependência externa
  return result; // expect
};

export default { findAll };
