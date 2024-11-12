import { createChannelInDB } from '../repositories/channelRepository.js';
import { addGuestInDB } from '../repositories/guestRepository.js';

export const createChannelService = async (name, host_id, guests) => {
  // 채널 생성
  const channel = await createChannelInDB(name, host_id);

  // 게스트 추가
  const guestPromises = guests.map(guest => {
    const { name, start_location, end_location, path, marker_style } = guest;
    return addGuestInDB(
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
