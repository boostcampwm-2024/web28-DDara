import { ResponseDto } from '@/api/dto/response.dto.ts';
import { getApiClient } from '@/api/client.api.ts';
import { createChannelReqEntity, createChannelResEntity } from '@/api/dto/channel.dto.ts';

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
          fnResolve(new ResponseDto<createChannelResEntity>(res));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};
