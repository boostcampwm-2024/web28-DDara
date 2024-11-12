import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db/db.js';

export const createChannelInDB = async (name, host_id) => {
  const id = uuidv4();
  const query = `
    INSERT INTO "main"."channel" (id, name, host_id)
    VALUES ($1, $2, $3)
    RETURNING *; 
  `;
  const values = [id, name, host_id];
  const result = await pool.query(query, values);

  return result.rows[0];
};
