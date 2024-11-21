import { getApiClient } from '@/api/client.api.ts';
import { ResponseDto } from '@/api/dto/response.dto.ts';
import { LoginResEntity, RegisterResEntity } from '@/api/dto/auth.dto.ts';

export const doLogin = (id: string, password: string): Promise<ResponseDto<LoginResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<LoginResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .post('/auth/login', { id, password })
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<LoginResEntity>(res));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const doRegister = (
  id: string,
  name: string,
  password: string,
  email: string,
): Promise<ResponseDto<RegisterResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<RegisterResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .post('/auth/register', { id, name, password, email })
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<RegisterResEntity>(res));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};
