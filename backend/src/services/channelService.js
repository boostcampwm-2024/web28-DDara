import {
  createChannelInDB,
  deleteChannelByIdFromDB,
  getChannelInfoByIdInDB,
  getChannelsByUserIdFromDB,
  getChannelWithGuestsByIdFromDB,
  getGuestByChannelAndGuestIdFromDB,
} from '../repositories/channelRepository.js';
import { addGuestToChannel } from '../repositories/guestRepository.js';

/**
 * @description 새로운 채널을 생성하고 게스트를 추가
 * @param {string} name - 채널 이름
 * @param {string} host_id - 채널 호스트 ID
 * @param {Array} guests - 추가할 게스트 목록
 * @returns {object} 생성된 채널 정보
 */
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

/**
 * @description 특정 채널에 게스트 추가
 * @param {string} channelId - 채널 ID
 * @param {Array} guests - 추가할 게스트 목록
 * @returns {object|null} 채널 정보 (채널이 없을 경우 null 반환)
 */
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

/**
 * @description 채널 ID로 채널과 게스트 정보를 조회
 * @param {string} id - 채널 ID
 * @returns {object} 채널과 게스트 정보
 * @throws {Error} 채널 조회 실패 시 오류 발생
 */
export const getChannelByIdService = async id => {
  try {
    return await getChannelWithGuestsByIdFromDB(id);
  } catch (error) {
    throw new Error('Error fetching channel', error);
  }
};

/**
 * @description 채널 ID와 게스트 ID로 특정 게스트 정보를 조회
 * @param {string} channelId - 채널 ID
 * @param {string} guestId - 게스트 ID
 * @returns {object|null} 채널과 해당 게스트 정보 (채널 또는 게스트가 없을 경우 null 반환)
 * @throws {Error} 조회 실패 시 오류 발생
 */
export const getChannelGuestInfoService = async (channelId, guestId) => {
  try {
    return await getGuestByChannelAndGuestIdFromDB(channelId, guestId);
  } catch (error) {
    throw new Error('Error fetching channel', error);
  }
};

/**
 * @description 사용자 ID로 해당 사용자가 호스트인 채널 목록을 조회
 * @param {string} userId - 사용자 ID
 * @returns {Array} 사용자가 호스트인 채널 목록
 * @throws {Error} 채널 조회 실패 시 오류 발생
 */
export const getUserChannels = async userId => {
  try {
    return await getChannelsByUserIdFromDB(userId);
  } catch (error) {
    throw new Error('Failed to fetch channels', error);
  }
};

/**
 * @description 채널 삭제 서비스
 * @param {string} id - 삭제할 채널의 ID
 * @returns {boolean} 삭제 성공 여부
 */
export const deleteChannelService = async id => {
  try {
    return await deleteChannelByIdFromDB(id);
  } catch (error) {
    throw new Error('Failed to delete channel', error);
  }
};
