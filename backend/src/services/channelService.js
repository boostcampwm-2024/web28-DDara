import {
  createChannelInDB,
  getChannelInfoByIdInDB,
  getChannelWithGuestsByIdFromDB,
} from '../repositories/channelRepository.js';
import { addGuestToChannel } from '../repositories/guestRepository.js';

export const createChannelService = async (name, host_id, guests) => {
  const channel = await createChannelInDB(name, host_id);

  const guestPromises = guests.map(guest => {
    const { name, start_location, end_location, path, marker_style } = guest;
    return addGuestToChannel(
      channel.id,
      name,
      start_location,
      end_location,
      path,
      marker_style,
      host_id,
    );
  });

  await Promise.all(guestPromises);

  return channel;
};

export const addGuestService = async (channelId, guests) => {
  const channel = await getChannelInfoByIdInDB(channelId);
  if (!channel) return null;

  const guestPromises = guests.map(guest => {
    const { name, start_location, end_location, path, marker_style } = guest;
    return addGuestToChannel(
      channelId,
      name,
      start_location,
      end_location,
      path,
      marker_style,
      channel.host_id,
    );
  });

  await Promise.all(guestPromises);

  return channel;
};

export const getChannelByIdService = async id => {
  try {
    return await getChannelWithGuestsByIdFromDB(id);
  } catch (error) {
    console.error('Error fetching channel:', error);
    throw error;
  }
};
