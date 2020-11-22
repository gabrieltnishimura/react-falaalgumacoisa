import config from '../config';
import DashboardModel from '../dashboard/DashboardModel';
import { get } from './api';

const getDashboard = async (): Promise<DashboardModel> => {
  const url = config.endpoints.dashboard;
  const response = await get<any>(url).toPromise()
  return new DashboardModel(response);
}

export {
  getDashboard,
};
