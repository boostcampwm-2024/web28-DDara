import {
  addGuestService,
  createChannelService,
  getChannelByIdService,
  getChannelGuestInfoService,
  getUserChannels,
} from '../services/channelService.js';

/**
 * @description 채널 생성 컨트롤러
 */
export const createChannelController = async (req, res) => {
  try {
    const { name, host_id, guests } = req.body;

    const channel = await createChannelService(name, host_id, guests);

    return res.status(201).json({
      success: true,
      message: 'Channel created successfully',
      data: channel,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

/**
 * @description 채널에 게스트 추가 컨트롤러
 */
export const addGuestController = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { guests } = req.body;

    const updatedChannel = await addGuestService(channelId, guests);

    if (!updatedChannel) {
      return res.status(404).json({
        success: false,
        message: 'Channel not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Guests added successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

/**
 * @description 채널 정보 조회 컨트롤러
 */
export const getChannelInfoController = async (req, res) => {
  const { id } = req.params;

  try {
    const channel = await getChannelByIdService(id);
    if (!channel) {
      return res.status(404).json({ success: false, message: 'Channel not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Get channel successfully',
      data: channel,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @description 채널에 특정 게스트 정보 조회 컨트롤러
 */
export const getChannelGuestInfoController = async (req, res) => {
  const { channelId, guestId } = req.params;
  try {
    const result = await getChannelGuestInfoService(channelId, guestId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Get guest data successfully',
        data: result,
      });
    } else {
      res.status(404).json({ success: false, message: 'Channel or guest not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @description 사용자의 채널 리스트 조회 컨트롤러
 */
export const getUserChannelsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const channels = await getUserChannels(userId);
    if (!channels.length) {
      return res.status(404).json({ success: false, message: 'No channels found for this user.' });
    }
    res.status(200).json({
      success: true,
      message: 'Get channels successfully',
      data: { channels },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
