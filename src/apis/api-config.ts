import { AxiosRequestConfig } from 'axios';
import config from '../config';

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: config.baseUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
};