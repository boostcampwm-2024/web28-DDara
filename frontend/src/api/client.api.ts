import { AppConfig } from '@/lib/constants/commonConstants.ts';
import { loadLocalData } from '@/utils/common/manageLocalData.ts';
import axios from 'axios';

let apiClient = axios.create({
  baseURL: AppConfig.API_SERVER,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});

export function setApiToken(token: string): void {
  if (apiClient) apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const getApiClient = () => {
  const token = loadLocalData(AppConfig.KEYS.LOGIN_TOKEN);
  if (token) setApiToken(token);
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: AppConfig.API_SERVER,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  return apiClient;
};
