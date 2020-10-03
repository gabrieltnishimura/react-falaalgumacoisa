import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { map } from 'rxjs/operators';
import { authenticationService } from '../authentication/AuthenticationService';

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config);
  axiosInstance.interceptors.request.use(
    config => {
      const user = authenticationService.getUser();
      if (!user) {
        return Promise.resolve(config);
      }

      return user.getToken().pipe(
        map(token => {
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
          }
          return config;
        }),
      ).toPromise();
    },
    error => {
      Promise.reject(error)
    });

  return axiosInstance;
};

export default initialization;