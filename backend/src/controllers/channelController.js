import {
  addGuestService,
  createChannelService,
  getChannelByIdService,
} from '../services/channelService.js';

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
