import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db/db.js';

export const addGuestInDB = async (
  channel_id,
  name,
  start_location,
  end_location,
  path,
  marker_style,
  host_id,
) => {
  const guest_id = uuidv4();
  const query = `
    INSERT INTO "main"."guest" (id, channel_id, name, start_location, end_location, path, marker_style, host_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    guest_id,
    channel_id,
    name,
    start_location,
    end_location,
    path,
    marker_style,
    host_id,
  ];
  const result = await pool.query(query, values);

  return result.rows[0];
};
