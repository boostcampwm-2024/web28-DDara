import { createChannelInDB, getChannelById } from '../repositories/channelRepository.js';
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
  const channel = await getChannelById(channelId);
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
