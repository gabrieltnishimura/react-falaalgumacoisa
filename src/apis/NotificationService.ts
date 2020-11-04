import config from '../config';
import { get } from './api';

const getNotifications = async (): Promise<any> => {
  const url = config.endpoints.notifications;
  const response = await get<any>(url).toPromise();
  return response;
}

export {
  getNotifications,
};
