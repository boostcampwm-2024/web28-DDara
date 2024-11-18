import { getApiClient } from '@/api/client.api.ts';
import { ResponseDto } from '@/api/dto/response.dto.ts';
import { LoginResEntity } from '@/api/dto/auth.dto.ts';

export const doLogin = (id: string, password: string): Promise<ResponseDto<LoginResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<LoginResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .post('/auth/login', { id, password })
      .then(res => {
        if (!res.data.success) {
          console.error(res);
          fnReject(`msg.${res.data.resultMsg}`);
        } else {
          fnResolve(new ResponseDto<LoginResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};
