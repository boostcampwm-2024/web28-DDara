import { pool } from '../db/db.js';

export const findUserById = async id => {
  const result = await pool.query('SELECT * FROM "main"."user" WHERE id = $1', [id]);
  return result.rows[0];
};
