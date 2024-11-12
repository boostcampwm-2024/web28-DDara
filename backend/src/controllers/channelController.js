import { createChannelService } from '../services/channelService.js';

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
