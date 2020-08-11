import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { axiosRequestConfiguration } from './api-config';
import initializeAxios from './api-setup';

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const get = <T>(url: string,
  queryParams?: object,
  responseType?: 'json' | 'text'): Observable<T> => {
  return defer(() => axiosInstance.get<T>(url, { params: queryParams, responseType }))
    .pipe(map(result => result.data));
};

const post = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.post<T>(url, body, { params: queryParams }))
    .pipe(map(result => result.data));
};

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.put<T>(url, body, { params: queryParams }))
    .pipe(map(result => result.data));
};

const patch = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.patch<T>(url, body, { params: queryParams }))
    .pipe(map(result => result.data));
};

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
  return defer(() => (axiosInstance.delete(`${url}/${id}`)))
    .pipe(map(result => result.data)
    );
};

export {
  get,
  post,
  put,
  patch,
  deleteR as delete,
};
