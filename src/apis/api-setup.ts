import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authenticationService } from '../authentication/AuthenticationService';

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config);
  axiosInstance.interceptors.request.use(
    config => {
      const user = authenticationService.getUser();
      if (!user) {
        return Promise.resolve(config);
      }

      return user.getToken()
        .then((token => {
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
          }
          return config;
        }));
    },
    error => {
      Promise.reject(error)
    });

  return axiosInstance;
};

export default initialization;