import { getApiClient } from './client.api';
import { ResponseDto } from './dto/response.dto';
import { searchResultEntity } from './dto/search.dto';

export const getSearchData = (query: string): Promise<ResponseDto<searchResultEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<searchResultEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get('/search', {
        params: { query },
      })
      .then(res => {
        if (res.status !== 200) {
          fnReject(`msg.${res.status}`);
        } else {
          console.log(res.data);
          fnResolve(new ResponseDto<searchResultEntity>(res.data));
        }
      })
      .catch(err => {
        console.error('API Error:', err);
        fnReject('msg.RESULT_FAILED');
      });
  };

  return new Promise(promiseFn);
};
