import { lastValueFrom } from 'rxjs';
import config from '../config';
import DashboardModel from '../dashboard/DashboardModel';
import { get } from './api';

const getDashboard = async (): Promise<DashboardModel> => {
  const url = config.endpoints.dashboard;
  const response = await lastValueFrom(get<any>(url));
  return new DashboardModel(response);
};

export { getDashboard };
