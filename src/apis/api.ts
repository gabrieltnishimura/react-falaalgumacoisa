import { defer, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { axiosRequestConfiguration } from './api-config';
import initializeAxios from './api-setup';

const axiosInstance = initializeAxios(axiosRequestConfiguration);
const handleError = (error: any) => throwError(error?.response?.data);

const get = <T>(url: string,
  queryParams?: object,
  responseType?: 'json' | 'text'): Observable<T> => {
  return defer(() => axiosInstance.get<T>(url, { params: queryParams, responseType }))
    .pipe(
      map(result => result.data),
      catchError(handleError),
    );
};

const post = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.post<T>(url, body, { params: queryParams }))
    .pipe(
      map(result => result.data),
      catchError(handleError),
    );
};

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.put<T>(url, body, { params: queryParams }))
    .pipe(
      map(result => result.data),
      catchError(handleError),
    );
};

const patch = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => axiosInstance.patch<T>(url, body, { params: queryParams }))
    .pipe(
      map(result => result.data),
      catchError(handleError),
    );
};

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
  return defer(() => (axiosInstance.delete(`${url}/${id}`)))
    .pipe(
      map(result => result.data),
      catchError(handleError),
    );
};

export {
  get,
  post,
  put,
  patch,
  deleteR,
};
