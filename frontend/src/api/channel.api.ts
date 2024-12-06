import { ResponseDto } from '@/api/dto/response.dto.ts';
import {
  addChannelReqEntity,
  addChannelResEntity,
  createChannelReqEntity,
  createChannelResEntity,
  getChannelResEntity,
  getUserChannelsResEntity,
  getGuestResEntity,
  deleteChannelResEntity,
} from '@/api/dto/channel.dto.ts';
import { getApiClient } from '@/api/client.api.ts';

export const createChannel = (
  data: createChannelReqEntity,
): Promise<ResponseDto<createChannelResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<createChannelResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .post('/channel', data)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<createChannelResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const addGuestChannel = (
  data: addChannelReqEntity,
): Promise<ResponseDto<addChannelResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<addChannelResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .post(`/channel/${data.channel_id}/guests`, data)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<addChannelResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const getUserChannels = (userId: string): Promise<ResponseDto<getUserChannelsResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<getUserChannelsResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get(`/channel/user/${userId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<getUserChannelsResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const getChannelInfo = (channelId: string): Promise<ResponseDto<getChannelResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<getChannelResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get(`/channel/${channelId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<getChannelResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const getGuestInfo = (
  channelId: string,
  userId: string,
): Promise<ResponseDto<getGuestResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<getGuestResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get(`/channel/${channelId}/guest/${userId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<getGuestResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const deleteChannel = (channelId: string): Promise<ResponseDto<deleteChannelResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<deleteChannelResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .delete(`/channel/${channelId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<deleteChannelResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};
