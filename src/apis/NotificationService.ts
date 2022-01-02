import { lastValueFrom } from 'rxjs';
import config from '../config';
import { post } from './api';

const cleanNotifications = async (): Promise<void> => {
  const url = config.endpoints.cleanNotifications;
  await lastValueFrom(post<any>(url, {}));
};

export { cleanNotifications };
