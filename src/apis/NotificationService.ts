import config from '../config';
import { post } from './api';

const cleanNotifications = async (): Promise<void> => {
  const url = config.endpoints.cleanNotifications;
  await post<any>(url, {}).toPromise();
}

export {
  cleanNotifications,
};
