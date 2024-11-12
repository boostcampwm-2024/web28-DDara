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

export const getChannelInfoByIdInDB = async channelId => {
  const query = `
    SELECT * 
    FROM "main"."channel"  
    WHERE id = $1;
  `;
  const values = [channelId];
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

export const getChannelWithGuestsByIdFromDB = async id => {
  try {
    const channelQuery = 'SELECT * FROM "main"."channel" WHERE id = $1';
    const guestQuery = 'SELECT * FROM "main"."guest" WHERE channel_id = $1';

    const channelResult = await pool.query(channelQuery, [id]);
    if (channelResult.rows.length === 0) {
      return null;
    }

    const channel = channelResult.rows[0];

    const guestResult = await pool.query(guestQuery, [id]);

    const guests = guestResult.rows;

    return {
      id: channel.id,
      name: channel.name,
      host_id: channel.host_id,
      guests: guests.map(guest => ({
        id: guest.id,
        name: guest.name,
        start_location: {
          lat: guest.start_location.lat,
          lng: guest.start_location.lng,
        },
        end_location: {
          lat: guest.end_location.lat,
          lng: guest.end_location.lng,
        },
      })),
    };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
